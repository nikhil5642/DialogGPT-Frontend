import React from "react";
import Head from "next/head";

const BasicIntentTrigger = () => {
	const handleIntentTrigger = () => {
		window.location.href =
			"intent:#Intent;action=android.intent.action.VIEW;data=https://www.google.com;end";
	};

	return (
		<>
			<Head>
				<title>Basic Intent Trigger</title>
				<meta name="description" content="Test Android Intent Triggers" />
			</Head>
			<div>
				<button onClick={handleIntentTrigger}>Test Basic Intent</button>
			</div>
		</>
	);
};

BasicIntentTrigger.showHeaderFooter = true;

export default BasicIntentTrigger;
