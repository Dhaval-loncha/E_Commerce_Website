import { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
	const [state, setState] = useState("Login");

	const [formData, setFormData] = useState({
		username: "",
		password: "",
		email: "",
	});

	const changeHandler = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const login = async () => {
		console.log("Login func executed", formData);
		let responseData;
		try {
			const response = await fetch("http://localhost:4000/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(formData),
			});

			// Handle the JSON response properly here
			responseData = await response.json();

			if (responseData.success) {
				localStorage.setItem("auth-token", responseData.token);
				window.location.replace("/");
			} else {
				alert(responseData.error);
			}
		} catch (error) {
			console.error("Error during signup:", error);
		}
	};
	const signup = async () => {
		console.log("signup func executed", formData);
		let responseData;
		try {
			const response = await fetch("http://localhost:4000/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(formData),
			});

			// Handle the JSON response properly here
			responseData = await response.json();

			if (responseData.success) {
				localStorage.setItem("auth-token", responseData.token);
				window.location.replace("/");
			} else {
				alert(responseData.error);
			}
		} catch (error) {
			console.error("Error during signup:", error);
		}
	};

	return (
		<div className="login-signup">
			<div className="login-signup-container">
				<h1>{state}</h1>
				<div className="login-signup-fields">
					{state === "Sign Up" ? (
						<input
							type="text"
							name="username"
							value={formData.username}
							onChange={changeHandler}
							placeholder="Your Name"
						/>
					) : null}
					<input
						name="email"
						value={formData.email}
						onChange={changeHandler}
						type="email"
						placeholder="Email Id"
					/>
					<input
						name="password"
						value={formData.password}
						onChange={changeHandler}
						type="password"
						placeholder="Password"
					/>
				</div>
				<button
					onClick={() => {
						state === "Login" ? login() : signup();
					}}
				>
					Continue
				</button>
				{state === "Sign Up" ? (
					<p className="login">
						Already have an account?{" "}
						<span
							onClick={() => {
								setState("Login");
							}}
						>
							Login Here
						</span>
					</p>
				) : (
					<p className="login">
						Create an account?{" "}
						<span
							onClick={() => {
								setState("Sign Up");
							}}
						>
							Click Here
						</span>
					</p>
				)}
				<div className="login-signup-agree">
					<input type="checkbox" name="" id="" />
					<p>By continuing, I agree to the terms of use & privacy policy</p>
				</div>
			</div>
		</div>
	);
};

export default LoginSignup;
