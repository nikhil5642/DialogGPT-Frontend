import Head from "next/head";
import "./styles/global.scss";
import Layout from "../src/components/layout/layout";
import "firebase/auth";
import LoaderProvider from "../src/components/loader/loader-provider";
import Loader from "../src/components/loader/loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FirebaseProvider } from "src/helper/firebase-provider";
import { BackgroundType } from "src/helper/background-helper";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=5"
				/>
			</Head>
			<FirebaseProvider>
				<LoaderProvider>
					<Layout>
						<Loader />
						<ToastContainer />
						<Component {...pageProps} />
					</Layout>
				</LoaderProvider>
			</FirebaseProvider>
		</>
	);
}

export default MyApp;
