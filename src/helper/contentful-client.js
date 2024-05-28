const contentful = require("contentful");

export function getContentfulClient() {
	return contentful.createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
	});
}

export function fixContentUrl(url) {
	return url.startsWith("//") ? `https:${url}` : url;
}
