const PricingFeatures = {
	MESSAGE_CREDITS_30: "30 message credits/month",
	MESSAGE_CREDITS_2000: "2,000 message credits/month",
	MESSAGE_CREDITS_10000: "10,000 message credits/month",
	MESSAGE_CREDITS_GPT4_500: "500 GPT-4 message credits/month",
	CHATBOT_1: "1 chatbot",
	CHATBOT_2: "2 chatbots",
	CHATBOT_5: "5 chatbots",
	CHARACTERS_400K: "400,000 characters/chatbot",
	CHARACTERS_11M: "11,000,000 characters/chatbot",
	GPT4_OPTION: "Option to Choose GPT-4",
};

export const PricingPlans = {
	FREE: {
		name: "Free",
		id: "free",
		features: [
			PricingFeatures.CHATBOT_1,
			PricingFeatures.MESSAGE_CREDITS_30,
			PricingFeatures.CHARACTERS_400K,
		],
		buttonText: "Get Started",
		price: "$0",
	},
	ESSENTIAL: {
		name: "Essential",
		id: "essential",
		features: [
			PricingFeatures.CHATBOT_2,
			PricingFeatures.MESSAGE_CREDITS_2000,
			PricingFeatures.CHARACTERS_11M,
		],
		buttonText: "Subscribe",
		price: "$19/month",
	},
	PRO: {
		name: "Pro",
		id: "pro",
		features: [
			PricingFeatures.CHATBOT_5,
			PricingFeatures.MESSAGE_CREDITS_10000,
			PricingFeatures.CHARACTERS_11M,
			PricingFeatures.GPT4_OPTION,
			PricingFeatures.MESSAGE_CREDITS_GPT4_500,
		],
		buttonText: "Go Pro",
		price: "$99/month",
	},
};
