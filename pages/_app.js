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
						src="https://www.dialoggpt.io/embed-chatbot.js"
						id="23b3dc28-ae71-4cf2-a5b1-652f561c4641"
						defer
					></script>
				)}

				<script
					async
					src="https://www.googletagmanager.com/gtag/js?id=AW-880583637"
				></script>
				<script>
					window.dataLayer = window.dataLayer || []; function gtag()
					{dataLayer.push(arguments)}; gtag('js', new Date()); gtag('config',
					'AW-880583637');
				</script>
			</Head>
			<IsolationContext.Provider value={isIsolated}>
				<LoaderProvider>
					{isIsolated ? (
						<Component {...pageProps} />
					) : (
						<FirebaseProvider>
							<Layout>
								<Loader />
								<ToastContainer />
								<Component {...pageProps} />
							</Layout>
						</FirebaseProvider>
					)}
				</LoaderProvider>
			</IsolationContext.Provider>
		</>
	);
}

export default MyApp;
