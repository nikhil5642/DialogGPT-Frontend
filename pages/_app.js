import Head from "next/head";
import "./styles/global.scss";
import Layout from "../src/components/layout/layout";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import LoaderProvider from "../src/components/loader/loader-provider";
import Loader from "../src/components/loader/loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
const firebaseConfig = {
	apiKey: "AIzaSyCJ8u8nMGdqmaPeq9NBG5_wFJiKaTAozhA",
	authDomain: "chatbot-37637.firebaseapp.com",
	projectId: "chatbot-37637",
	storageBucket: "chatbot-37637.appspot.com",
	messagingSenderId: "570891403073",
	appId: "1:570891403073:web:aacbae1b1436bcd98d2bc0",
	measurementId: "G-YH1V9X5434",
};

const app = initializeApp(firebaseConfig);

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=5"
				/>
			</Head>
			<LoaderProvider>
				<Layout>
					<Loader />
					<ToastContainer />
					<Component {...pageProps} />
				</Layout>
			</LoaderProvider>
		</>
	);
}

export default MyApp;
