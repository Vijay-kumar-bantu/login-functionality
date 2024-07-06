import React from "react";
import hero from "../assets/hero.png";
import "../styles/ImageBox.css";

function ImageBox() {
	return (
		<div className="imgBox">
			<h1 className="heroText">
				Engage Your Customers At Every Stage Of Sales To Get Higher
				Conversation...
			</h1>

			<img className="heroImg" src={hero} alt={"hero image"} />
		</div>
	);
}

export default ImageBox;
