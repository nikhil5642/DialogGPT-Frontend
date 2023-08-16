import styles from "./website-loader.module.scss";
import { useState, useEffect } from "react";
import EditBoxComponent from "../../editbox-component/editbox-component";
import { postRequest } from "../../../helper/http-helper";

export default function WebisteLoader({ bot_id, data, setData }) {
	const [url, setUrl] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		setError(isValidUrl(url) ? "" : "Invalid Url");
	}, [url]);
	const fetchUrls = () => {
		postRequest("/fetch_urls", { url: url, botID: bot_id }, {}, 10000000).then(
			(res) => {
				console.log(res);
			},
		);
	};

	return (
		<div className={styles.container}>
			<h4>Crawl</h4>
			<EditBoxComponent
				placeholder={"https://www.example.com"}
				value={url}
				onChange={(value) => setUrl(value)}
				error={error}
			/>

			<button className={styles.button} onClick={fetchUrls}>
				Fetch Links
			</button>
		</div>
	);
}

function isValidUrl(url) {
	const pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
	return pattern.test(url);
}
