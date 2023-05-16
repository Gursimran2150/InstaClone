import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./Login.css";

const Login = () => {
	const [currentImage, setCurrentImage] = useState('/images/screenshot1.png')
	
	//Array of screenShot images
	const addImages = ['/images/screenshot1.png', '/images/screenshot2.png', '/images/screenshot3.png', '/images/screenshot4.png']

	//current image timing on mobile view
	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentImage(addImages[Math.floor(Math.random() * addImages.length)]);
		}, 3000)

		return () => clearInterval(intervalId);
	}, [])

	return (
		< div className="loginPanel">
			<div className="main">
				<div className="imgBox">
					<div className="innerImg">
						<img src={currentImage} alt="home" />
					</div>
				</div>
				<LoginForm />
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
};
export default Login;
