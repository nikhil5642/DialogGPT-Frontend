import React, { useEffect, useState } from "react";
import { postRequest } from "../../../helper/http-helper";
import styles from "./leads-collection.module.scss";
import SettingsComponent from "../../settings-component/settings-component";
import { showErrorToast, showSuccessToast } from "../../../helper/toast-helper";
import { useTrackEvent } from "../../../helper/event-tracker";

export default function LeadsCollectionSettings({ botID }) {
	const [loader, setLoader] = useState(false);
	const { trackEvent } = useTrackEvent();
	const [leads, setLeads] = useState([]);
	useEffect(() => {
		if (botID) {
			setLoader(true);
			postRequest("/fetch_chatbot_leads_info", { botID: botID })
				.then((data) => {
					setLoader(false);
					setLeads(data.result);
				})
				.catch(() => {
					setLoader(false);
					showErrorToast("Error Fetching Information");
				});
		}
	}, [botID]);
	const toggleLead = (leadType) => {
		if (leads.includes(leadType)) {
			setLeads((prevLeads) => prevLeads.filter((lead) => lead !== leadType));
		} else {
			setLeads((prevLeads) => [...prevLeads, leadType]);
		}
	};
	return (
		<SettingsComponent
			title={"Collect Leads"}
			isLoading={loader}
			content={
				<div className={styles.leadsContainer}>
					<div>
						<input
							type="checkbox"
							checked={leads.includes("lead_email")}
							onChange={() => toggleLead("lead_email")}
						/>
						Email
					</div>
					<div>
						<input
							type="checkbox"
							checked={leads.includes("lead_name")}
							onChange={() => toggleLead("lead_name")}
						/>
						Name
					</div>
					<div>
						<input
							type="checkbox"
							checked={leads.includes("lead_phone")}
							onChange={() => toggleLead("lead_phone")}
						/>
						Phone
					</div>
				</div>
			}
			onSave={() => {
				setLoader(true);
				postRequest("/update_chatbot_leads_info", {
					botID: botID,
					leads: leads,
				})
					.then(() => {
						setLoader(false);
						showSuccessToast("Information Updated Successfully");
						trackEvent("chatbot_leads_data_updated", {
							botID: botID,
							leads: leads,
						});
					})
					.catch(() => {
						setLoader(false);
						showErrorToast("Error Updating Information");
						trackEvent("chatbot_leads_update_failure", { botID: data.id });
					});
			}}
		/>
	);
}
