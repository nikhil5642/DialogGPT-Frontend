import React, { useContext } from "react";
import LoaderContext from "./loader-context";

import styles from "./loader.module.scss";
const Loader = () => {
	const { isLoading, message } = useContext(LoaderContext);

	if (!isLoading) return null;

	return (
		<div className={styles.loaderOverlay}>
			<div className={styles.loader}>
				<div className={styles.spinner}></div>
				<div className={styles.loaderMessage}>{message}</div>
			</div>
		</div>
	);
};

export default Loader;
