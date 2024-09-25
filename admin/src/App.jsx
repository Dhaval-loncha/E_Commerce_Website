import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Admin from "./pages/Admin/Admin";
import AdminLogin from "./pages/AdminLogin/AdminLogin";

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const handleLogin = (authStatus) => {
		setIsAuthenticated(authStatus);
	};
	return (
		<div>
			{isAuthenticated ? (
				<>
					<Navbar />
					<Admin />
				</>
			) : (
				<AdminLogin onLogin={handleLogin} />
			)}
		</div>
	);
};

export default App;
