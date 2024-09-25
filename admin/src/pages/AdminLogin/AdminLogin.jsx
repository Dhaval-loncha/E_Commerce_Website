import React, { useState } from "react";
import "./AdminLogin.css";

const AdminLogin = ({ onLogin }) => {
	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

    const adminId = import.meta.env.VITE_USER_NAME;
    const adminPassword = import.meta.env.VITE_PASSWORD;

		// Example validation logic
		if (userId === adminId && password === adminPassword) {
			setError("");
			onLogin(true); // Call the onLogin function passed from the App component
		} else {
			setError("Invalid user ID or password.");
		}
	};

	return (
		<div className="background">
			<div className="shape first"></div>
			<div className="shape second"></div>
			<div className="login-container">
				<form onSubmit={handleSubmit} className="login-form">
					<h3>LOGIN</h3>

					<input
						type="text"
						placeholder="Username"
						id="username"
						value={userId}
						onChange={(e) => setUserId(e.target.value)}
            autoComplete="off"
						required
					/>

					<input
						type="password"
						placeholder="Password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
						required
					/>

					<button type="submit">Log In</button>
					{error && <p className="error-message">{error}</p>}
				</form>
			</div>
		</div>
	);
};

export default AdminLogin;
