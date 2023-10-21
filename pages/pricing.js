import styles from "./styles/pricing.module.scss";
import Head from "next/head";
import PricingFAQs from "src/components/pricing-faqs/pricing-faqs";
import ConfettiExplosion from "react-confetti-explosion";
import BottomTryNowComponent from "../src/components/bottom-try-now-component/bottom-try-now-component";
import PricingWidget from "../src/components/pricing-widget/pricing-widget";
import { useState, useRef, useEffect } from "react";
function PricingScreen() {
	const pricingWidgetRef = useRef(null);
	const [pricingWidgetVisible, setPricingWidgetVisible] = useState(false);
	const [showConfetti, setShowConfetti] = useState(false);

	useEffect(() => {
		if (pricingWidgetVisible) {
			setShowConfetti(true);
		}
	}, [pricingWidgetVisible]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.target === pricingWidgetRef.current) {
						setPricingWidgetVisible(entry.isIntersecting);
					}
				});
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: 0.1,
			},
		);

		if (pricingWidgetRef.current) {
			observer.observe(pricingWidgetRef.current);
		}

		return () => {
			if (pricingWidgetRef.current) {
				observer.unobserve(pricingWidgetRef.current);
			}
		};
	}, []);

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
				{showConfetti && (
					<ConfettiExplosion
						force={1.5}
						duration={5000}
						particleCount={250}
						width={3000}
						zIndex={1000}
					/>
				)}
				<h1 className={styles.pricingHeader}>Pricing Plans</h1>

				<div
					ref={pricingWidgetRef}
					className={`${styles.fadeInUp} ${
						pricingWidgetVisible ? styles.visible : ""
					}`}
				>
					<PricingWidget />
				</div>
				<PricingFAQs />
				<BottomTryNowComponent />
			</div>
		</>
	);
}

PricingScreen.showHeaderFooter = true;
export default PricingScreen;
