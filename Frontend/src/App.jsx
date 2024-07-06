import { useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import ImageBox from "./components/ImageBox";

function App() {
	return (
		<>
			<div className="mainBox">
				<div className="twoColumn">
					<LoginForm />
					<ImageBox />
				</div>
			</div>
		</>
	);
}

export default App;
