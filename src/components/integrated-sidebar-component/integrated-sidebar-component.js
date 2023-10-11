import styles from "./integrated-sidebar-component.module.scss";
import { useState } from "react";
import Image from "next/image";

export const IntegratedSidebarComponent = ({
	sideBarItems,
	selectedKey,
	setSelectedKey,
}) => {
	return (
		<div className={styles.container}>
			<div className={styles.sideMenuContainer}>
				{Object.keys(sideBarItems).map((key) => (
					<div
						key={key}
						onClick={() => setSelectedKey(key)}
						className={
							key === selectedKey
								? `${styles.sideMenuItem} ${styles.selected}`
								: styles.sideMenuItem
						}
					>
						<Image
							src={sideBarItems[key].details.icon}
							alt={sideBarItems[key].details.text}
							title={sideBarItems[key].details.text}
							loading="lazy"
							height={24}
							width={24}
						></Image>
						<p>{sideBarItems[key].details.text}</p>
					</div>
				))}
			</div>
			<div className={styles.content}>{sideBarItems[selectedKey].view}</div>
		</div>
	);
};
