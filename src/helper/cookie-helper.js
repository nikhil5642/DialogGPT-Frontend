import Cookies from "js-cookie";

export async function storeCookie(key, value) {
	console.log(key, value);
	Cookies.set(key, value, {
		secure: true,
		httpOnly: false,
		sameSite: "strict",
	});
}

export function getCookie(key) {
	return Cookies.get(key);
}

export function removeCookie(key) {
	Cookies.remove(key);
}
