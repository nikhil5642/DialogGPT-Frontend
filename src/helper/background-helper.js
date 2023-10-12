export const BackgroundType = {
	BLUE_GRADIENT: "blue-gradient",
	SIMPLE_WHITE: "simple-white",
	LANDING_PAGE: "landing-page",
};

export const BackGroundSelector = (path) => {
	switch (path) {
		case "/home":
			return BackgroundType.LANDING_PAGE;
		case "/support":
			return BackgroundType.BLUE_GRADIENT;
		default:
			return BackgroundType.SIMPLE_WHITE;
	}
};
