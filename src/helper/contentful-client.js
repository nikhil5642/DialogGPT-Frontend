const contentful = require("contentful");

export function getContentfulClient() {
	return contentful.createClient({
		space: "zp70y861mhp1",
		accessToken: "6d2DJyEbo04eAGqODifAcuiaSa8Y3Y_oI70cH9cstdc",
	});
}

export function fixContentUrl(url) {
	return url.startsWith("//") ? `https:${url}` : url;
}
