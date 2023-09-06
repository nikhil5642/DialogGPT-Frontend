import Head from "next/head";
import "./styles/global.scss";
import Layout from "../src/components/layout/layout";
import "firebase/auth";
import LoaderProvider from "../src/components/loader/loader-provider";
import Loader from "../src/components/loader/loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FirebaseProvider } from "src/helper/firebase-provider";
import IsolationContext from "src/scripts/isolation-context";

function MyApp({ Component, pageProps }) {
	const isIsolated = Component.isIsolatedComponent === true; // default to false if not specified

	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=5"
				/>
				{!isIsolated && (
					<script
						src="/embed-chatbot.js"
						defer
						id="f38342c0-15b9-49b0-9fa5-c0135cc9c45a"
					></script>
				)}
			</Head>
			<IsolationContext.Provider value={isIsolated}>
				<FirebaseProvider>
					<LoaderProvider>
						{isIsolated ? (
							<Component {...pageProps} />
						) : (
							<Layout>
								<Loader />
								<ToastContainer />
								<Component {...pageProps} />
							</Layout>
						)}
					</LoaderProvider>
				</FirebaseProvider>
			</IsolationContext.Provider>
		</>
	);
}

export default MyApp;
