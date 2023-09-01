export const BackgroundType = {
	BLUE_GRADIENT: "blue-gradient",
	SIMPLE_WHITE: "simple-white",
};

export const BackGroundSelector = (path) => {
	switch (path) {
		case "/home":
		case "/support":
		case "/":
			return BackgroundType.BLUE_GRADIENT;
		default:
			return BackgroundType.SIMPLE_WHITE;
	}
};
