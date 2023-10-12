import { useEffect } from "react";
import { useRouter } from "next/router";

function Custom404() {
	const router = useRouter();

	useEffect(() => {
		router.replace("/");
	});

	return null;
}
Custom404.showHeaderFooter = true;
export default Custom404;
