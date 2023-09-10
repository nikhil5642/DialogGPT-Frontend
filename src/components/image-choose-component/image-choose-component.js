import React, { useState } from "react";
import "./image-choose-component.module.scss";

function ImageChooseComponent({ onImageSelect }) {
	const [imagePreview, setImagePreview] = useState(null);

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

	return (
		<div className="image-chooser">
			<input
				type="file"
				className="file-input"
				onChange={handleImageChange}
				accept=".png, .jpg, .jpeg"
			/>
		</div>
	);
}

export default ImageChooseComponent;
