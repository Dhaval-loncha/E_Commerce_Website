import { useContext, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import cartIcon from "../../assets/icons/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import dropDown from "../../assets/icons/nav_dropdown.png";

function Navbar() {
	const [menu, setMenu] = useState("/");

	const { getTotalCartItems } = useContext(ShopContext);

	const menuRef = useRef();

	const dropDownMenu = (e) => {
		menuRef.current.classList.toggle("nav-menu-active");
		e.target.classList.toggle("rotate");
	};

	return (
		<div className="navbar">
			<div className="nav-logo">
				<img src={logo} alt="" />
				<p>SHOPPER</p>
			</div>
			<img src={dropDown} alt="" onClick={dropDownMenu} className="nav-dropdown" />
			<ul className="nav-menu" ref={menuRef}>
				<li
					onClick={() => {
						setMenu("shop");
					}}
				>
					<Link to={"/"}>Shop</Link>
					{menu === "/" || menu === "shop" ? <hr /> : null}
				</li>
				<li
					onClick={() => {
						console.log("men clicked", menu);
						setMenu("men");
					}}
				>
					<Link to={"/men"}>Men</Link>

					{menu === "men" ? <hr /> : null}
				</li>
				<li
					onClick={() => {
						console.log("women clicked", menu);
						setMenu("women");
					}}
				>
					<Link to={"/women"}>Women</Link>

					{menu === "women" ? <hr /> : null}
				</li>
				<li
					onClick={() => {
						console.log("kids clicked", menu);
						setMenu("kids");
					}}
				>
					<Link to={"/kids"}>Kids</Link>

					{menu === "kids" ? <hr /> : null}
				</li>
			</ul>
			<div className="nav-login-cart">
				{localStorage.getItem("auth-token") ? (
					<button
						onClick={() => {
							localStorage.removeItem("auth-token");
							window.location.replace("/");
						}}
					>
						Logout
					</button>
				) : (
					<Link to={"/login"}>
						<button>Login</button>
					</Link>
				)}

				<Link to={"/cart"}>
					<img src={cartIcon} alt="" />
				</Link>
				<div className="nav-cart-count">{getTotalCartItems()}</div>
			</div>
		</div>
	);
}

export default Navbar;
