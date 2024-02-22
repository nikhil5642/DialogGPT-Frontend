import React, { useEffect, useState } from "react";
import {
	getContentfulClient,
	fixContentUrl,
} from "../src/helper/contentful-client";
import Head from "next/head";
import Image from "next/image";
import styles from "./styles/blogs.module.scss";
import Link from "next/link";

function BlogsScreen() {
	const [entries, setEntries] = useState([]);

	useEffect(() => {
		async function fetchEntries() {
			const client = getContentfulClient();
			const res = await client.getEntries({ content_type: "blogs" });
			console.log("res", res);
			setEntries(res.items); // Assuming res.items is the array you want to work with
		}

		fetchEntries();
	}, []);

	return (
		<>
			<Head>
				<title>DialogGPT Blogs</title>
				<link rel="canonical" href="https://dialoggpt.io/account" />
				<meta name="description" content="DialogGPT Account Page" />
				{/* Make sure your script tag is properly handled in Next.js */}
			</Head>
			<div className={styles.container}>
				{entries.map((entry) => (
					<Link
						href={`/blogs/${entry.fields.slug}`}
						passHref
						className={styles.entryLink}
					>
						<h2>{entry.fields.title}</h2>
						<Image
							src={fixContentUrl(entry.fields.titlePicture.fields.file.url)}
							alt={entry.fields.titlePicture.fields.title}
							width={500}
							height={300}
							layout="responsive"
						/>
						<p>{entry.fields.description}</p>
					</Link>
				))}
			</div>
		</>
	);
}

BlogsScreen.showHeaderFooter = true;

export default BlogsScreen;
