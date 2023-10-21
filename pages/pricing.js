import styles from "./styles/pricing.module.scss";
import Head from "next/head";
import PricingFAQs from "src/components/pricing-faqs/pricing-faqs";
import ConfettiExplosion from "react-confetti-explosion";
import BottomTryNowComponent from "../src/components/bottom-try-now-component/bottom-try-now-component";
import PricingWidget from "../src/components/pricing-widget/pricing-widget";
function PricingScreen() {
	return (
		<>
			<Head>
				<title>DialogGPT.io Pricing Plans - Affordable Chatbot Solutions</title>
				<meta
					name="description"
					content="Explore affordable pricing plans for DialogGPT.io. Choose the best chatbot solution tailored to your business needs."
				/>
				<link rel="canonical" href="https://dialoggpt.io/pricing" />
				<script type="application/ld+json">
					{JSON.stringify({
						"@context": "http://schema.org",
						"@type": "WebSite",
						name: "DialogGPT.io",
						url: "https://dialoggpt.io/pricing", // Corrected the URL to match the canonical link
						description:
							"Explore affordable pricing plans for DialogGPT.io. Choose the best chatbot solution tailored to your business needs.",
					})}
				</script>
			</Head>

			<div className={styles.pricingScreenContainer}>
				<ConfettiExplosion
					force={1.5}
					duration={5000}
					particleCount={250}
					width={3000}
					zIndex={1000}
				/>
				<h1 className={styles.pricingHeader}>Pricing Plans</h1>

				<PricingWidget />
				<PricingFAQs />
				<BottomTryNowComponent />
			</div>
		</>
	);
}

PricingScreen.showHeaderFooter = true;
export default PricingScreen;
