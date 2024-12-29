import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./styles/blogs.module.scss";

function FakeLoginTestScreen() {
	return (
		<>
			<Head>
				<title>DialogGPT Testing</title>
				<link rel="canonical" href="https://dialoggpt.io/account" />
				<meta name="description" content="DialogGPT Account Page" />
			</Head>
			<div className={styles.container}>
				<a
					href="intent:#Intent;action=android.intent.action.VIEW;data=https://www.google.com;end"
					className={styles.entryLink}
				>
					<h2>{"Test Fake Login Intent"}</h2>
				</a>
			</div>
		</>
	);
}

FakeLoginTestScreen.showHeaderFooter = true;

export default FakeLoginTestScreen;
