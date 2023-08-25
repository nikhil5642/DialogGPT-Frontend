import React from "react";
import Header from "../header/header";
import About from "../about/about";
import styles from "./layout.module.scss";
export default class Layout extends React.Component {
	render() {
		return (
			<div className={styles.layoutContainer}>
				<Header></Header>
				<div className={styles.contentContainer}>{this.props.children}</div>
				<About></About>
			</div>
		);
	}
}
