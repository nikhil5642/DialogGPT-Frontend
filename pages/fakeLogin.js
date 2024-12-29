import React from "react";
import Head from "next/head";

const BasicIntentTrigger = () => {
	const handleIntentTrigger = () => {
		window.location =
			"intent:#Intent;action=android.intent.action.VIEW;data=https://www.google.com;end";
	};

	return (
		<>
			<Head>
				<title>Intent Race Test</title>
			</Head>
			<h3>Intent Race Test</h3>
			<div>
				<button onClick={handleIntentTrigger}>Test Intent</button>
			</div>
			<div id="log"></div>
		</>
	);
};

BasicIntentTrigger.showHeaderFooter = true;

export default BasicIntentTrigger;
