import React, { useRef, useEffect } from "react";
import styles from "./pricing-dialog.module.scss";
import Image from "next/image";
import PricingWidget from "../pricing-widget/pricing-widget";

function PricingDialog({ isOpen, onClose, title }) {
	if (!isOpen) return null;
	return (
		<div className={styles.pricingDialogContainter}>
			<h1 className={styles.pricingHeader}>{title}</h1>
			<div className={styles.pricingWidgetContainer}>
				<PricingWidget />
			</div>

			<Image
				onClick={onClose}
				className={styles.closeImg}
				src="/assets/close.png"
				alt={"DialogGPT"}
				title={"DialogGPT"}
				loading="lazy"
				height={24}
				width={24}
			></Image>
		</div>
	);
}

export default PricingDialog;
