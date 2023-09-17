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
import Script from "next/script";
function MyApp({ Component, pageProps }) {
	const isIsolated = Component.isIsolatedComponent === true; // default to false if not specified

	return (
		<>
			{!isIsolated && (
				<>
					<Script
						src="https://dialoggpt.io/embed-chatbot.js"
						id="23b3dc28-ae71-4cf2-a5b1-652f561c4641"
						defer
						strategy="lazyOnload"
					/>
					<Script
						async
						strategy="lazyOnload"
						src="https://www.googletagmanager.com/gtag/js?id=AW-880583637"
					/>
					<Script strategy="lazyOnload">
						{`
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', 'AW-880583637');
						`}
					</Script>
					<Script strategy="lazyOnload">
						{`
							(function(c,l,a,r,i,t,y){
								c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
								t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
								y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
							})(window, document, "clarity", "script", "iwf4xtf2rv");
							`}
					</Script>
				</>
			)}
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=5"
				/>
			</Head>
			<IsolationContext.Provider value={isIsolated}>
				{isIsolated ? (
					<Component {...pageProps} />
				) : (
					<LoaderProvider>
						<FirebaseProvider>
							<Layout>
								<Loader />
								<ToastContainer />
								<Component {...pageProps} />
							</Layout>
						</FirebaseProvider>
					</LoaderProvider>
				)}
			</IsolationContext.Provider>
		</>
	);
}

export default MyApp;
