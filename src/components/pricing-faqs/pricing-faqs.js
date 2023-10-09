import React from "react";
import styles from "./pricing-faqs.module.scss";

function PricingFAQs() {
	const faqs = [
		{
			question: "Is there a free Trial?",
			answer:
				"Yes, we provide 7 days free trial with our Basic Plan. You can use these to test out chatbase and see if it works for you.",
		},
		{
			question: "How do message credits work?",
			answer:
				"One AI response with gpt-3.5-turbo (the default) costs 1 message credit. One AI response with gpt-4 costs 20 message credits. You can change which model your chatbot uses in the chatbot settings. The difference is because gpt-4 costs 15x (prompt tokens) and 30x (completion tokens) what gpt-3.5-turbo costs on OpenAI.",
		},
		{
			question: "What happens if I run out of message credits?",
			answer:
				"If you run out of message credits, your chatbot will stop working until you either buy more credits or wait until your credits reset at the start of the next month.",
		},
		{
			question: "Can I roll over unused message credits?",
			answer:
				"No, message credits do not roll over. They reset at the start of each month.",
		},
		{
			question: "How do I cancel my subscription?",
			answer:
				"You can cancel your subscription at any time from the billing page in your account settings. Once you cancel, you will not be charged again, but you are responsible for any charges already incurred.",
		},
		{
			question: "Can I get a refund?",
			answer:
				"We do not offer refunds. If you cancel your subscription, you will not be charged again, but you are responsible for any charges already incurred.",
		},
		{
			question: "How do I update my payment method?",
			answer:
				"You can update your payment method from the billing page in your account settings.",
		},
		{
			question: "Can I switch plans?",
			answer:
				"Yes, you can switch plans at any time from the billing page in your account settings. If you switch to a higher plan, you will be charged the difference between the two plans. If you switch to a lower plan, your message credits will be adjusted accordingly.",
		},
	];

	return (
		<div className={styles.container}>
			<h2>Pricing FAQs</h2>
			<div className={styles.faqSection}>
				{faqs.map((faq, index) => (
					<div key={index} className={styles.faqItem}>
						<h3>{faq.question}</h3>
						<p>{faq.answer}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default PricingFAQs;
