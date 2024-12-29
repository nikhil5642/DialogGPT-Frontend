import React, { useEffect, useState } from "react";
import {
	getContentfulClient,
	fixContentUrl,
} from "../src/helper/contentful-client";
import Head from "next/head";
import Image from "next/image";
import styles from "./styles/blogs.module.scss";
import Link from "next/link";

function FakeLoginTestScreen() {
	return (
		<>
			<Head>
				<title>DialogGPT Testing</title>
				<link rel="canonical" href="https://dialoggpt.io/account" />
				<meta name="description" content="DialogGPT Account Page" />
				{/* Make sure your script tag is properly handled in Next.js */}
			</Head>
			<div className={styles.container}>
				{entries.map((entry) => (
					<Link
						href={`intent:#Intent;action=android.intent.action.VIEW;data=https://www.google.com;end`}
						passHref
						className={styles.entryLink}
					>
						<h2>{"Test Fake Login Intent"}</h2>
					</Link>
				))}
			</div>
		</>
	);
}

FakeLoginTestScreen.showHeaderFooter = true;

export default FakeLoginTestScreen;
