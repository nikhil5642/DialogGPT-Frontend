import styles from "./website-loader.module.scss";
import { useState, useEffect } from "react";
import EditBoxComponent from "../../editbox-component/editbox-component";
import { postRequest } from "../../../helper/http-helper";
import { generateRandomString } from "../chatbot-source-editor.utits";
import LoadingButton from "src/components/loading-button/loading-button";

export default function WebisteLoader({ bot_id, data, setData }) {
	const [url, setUrl] = useState("");
	const [loader, setLoader] = useState({
		fetchLinks: false,
	});
	const fetchUrls = () => {
		setLoader((val) => ({ ...val, fetchLinks: true }));
		postRequest("/fetch_urls", { url: url, botID: bot_id }, {}, 10000000)
			.then((res) => {
				setData([...data, ...res.result]);
				setLoader((val) => ({ ...val, fetchLinks: false }));
			})
			.catch(() => {
				setLoader((val) => ({ ...val, fetchLinks: false }));
			});
	};
	const addURL = () => {
		setData([
			...data,
			{
				content_id: generateRandomString(10),
				source: "",
				source_type: "url",
				char_count: 0,
				last_updated: "",
				status: "newlyAdded",
			},
		]);
	};
	const handleDeleteUrl = (id) => {
		console.log(id);
		const updatedData = data.filter((item) => item.content_id !== id);
		setData(updatedData);
	};

	const handleEditUrl = (id, newSource) => {
		const updatedData = data.map((item) =>
			item.content_id === id
				? { ...item, source: newSource, status: "newlyAdded" }
				: { ...item },
		);
		setData(updatedData);
	};

	return (
		<div className={styles.container}>
			<h4>Crawl</h4>
			<EditBoxComponent
				placeholder={"https://www.example.com"}
				value={url}
				onChange={(value) => setUrl(value)}
			/>
			<LoadingButton
				title={"Fetch Links"}
				onClick={fetchUrls}
				isLoading={loader.fetchLinks}
			/>
			<ul>
				{data
					.filter((item) => item.source_type === "url")
					.map((item) => (
						<li key={item.url} className={styles.urlItem}>
							<EditBoxComponent
								placeholder={"https://www.example.com"}
								value={item.source}
								onChange={(value) => handleEditUrl(item.content_id, value)}
							/>
							{item.char_count > 0 && (
								<p className={styles.urlCharCount}>{item.char_count}</p>
							)}
							<button
								onClick={() => handleDeleteUrl(item.content_id)}
								className={styles.urlItemButton}
							>
								<img src="/assets/bin.png" alt="Delete" />
							</button>
						</li>
					))}
			</ul>
			<p className={styles.charDetected}>
				{data
					.filter((item) => item.source_type === "url")
					.reduce((acc, curr) => acc + curr.char_count, 0)}{" "}
				Char Detected
			</p>

			<div className={styles.addURLContainer}>
				<LoadingButton
					title={"Add URL"}
					onClick={addURL}
					className={styles.buttonAddURL}
				/>
			</div>
		</div>
	);
}
