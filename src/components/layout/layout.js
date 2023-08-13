import React from "react";
import Header from "../header/header";
import About from "../about/about";

export default class Layout extends React.Component {
	render() {
		return (
			<>
				<Header></Header>
				{this.props.children}
				<About></About>
			</>
		);
	}
}
