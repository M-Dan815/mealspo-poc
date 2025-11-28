// src/components/PopUp.js
import React from "react";
import {usePopUp} from "../context/PopUpContext";
import "./PopUp.css"; // We'll create this file

const PopUp = () => {
	const {
		isPopUpVisible,
		hidePopUp,
		handleEmailSubmit,
		email,
		setEmail,
		showFollowUp,
	} = usePopUp();

	if (!isPopUpVisible) return null;

	return (
		<div className="popup-overlay">
			<div className="popup-content">
				<button onClick={hidePopUp} className="popup-close-btn">
					&times;
				</button>
				{!showFollowUp ? (
					<>
						<h2>Get Early Access!</h2>
						<p>Join now and get your first 6 months free.</p>
						<form onSubmit={handleEmailSubmit}>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter your email"
								required
							/>
							<button type="submit">Sign Up</button>
						</form>
					</>
				) : (
					<div className="popup-followup">
						<h2>Thanks for joining!</h2>
						<p>Follow us on Instagram for updates.</p>
						<a
							href="https://instagram.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							@MealSpo
						</a>
					</div>
				)}
			</div>
		</div>
	);
};

export default PopUp;
