import React, { useEffect, useState } from "react";
import styles from "./image-choose-component.module.scss";

function ImageChooseComponent({ currentImage, onImageSelect }) {
	const [imagePreview, setImagePreview] = useState(currentImage);

	useEffect(() => {
		setImagePreview(currentImage);
	}, [currentImage]);
	const handleImageChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
				onImageSelect(reader.result); // Send the image data back to the parent
			};
			reader.readAsDataURL(file);
		}
	};
	const handleClosePreview = () => {
		setImagePreview(null);
		onImageSelect(null);
	};

	return (
		<div className={styles.imageChooser}>
			<input
				type="file"
				className={styles.fileInput}
				onChange={handleImageChange}
				accept=".png, .jpg, .jpeg"
			/>
			{imagePreview && (
				<div className={styles.imagePreviewContainer}>
					<img
						src={imagePreview}
						alt="Preview"
						className={styles.imagePreview}
						style={{ width: "64px", height: "64px", objectFit: "cover" }}
					></img>
					<button onClick={handleClosePreview} className={styles.closePreview}>
						X
					</button>
				</div>
			)}
		</div>
	);
}

export default ImageChooseComponent;
