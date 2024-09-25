import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Shop from "./pages/Shop";
import LoginSignup from "./pages/LoginSignup";
import ShopCategories from "./pages/ShopCategories";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Footer from "./components/Footer/Footer";
import menBanner from "./assets/images/banner_mens.png";
import womenBanner from "./assets/images/banner_women.png";
import kidsBanner from "./assets/images/banner_kids.png";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Shop />} />
				<Route path="/men" element={<ShopCategories category="men" banner={menBanner} />} />
				<Route path="/women" element={<ShopCategories category="women" banner={womenBanner} />} />
				<Route path="/kids" element={<ShopCategories category="kids" banner={kidsBanner} />} />
				<Route path="/product" element={<Product />}>
					<Route path=":productId" element={<Product />} />
				</Route>
				<Route path="/cart" element={<Cart />} />
				<Route path="/login" element={<LoginSignup />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
