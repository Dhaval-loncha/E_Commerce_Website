import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext(null);

// const url = "http://localhost:4000";

const url = "https://e-commerce-website-backend-x6ht.onrender.com";

const getDefaultCart = () => {
	let cart = {};
	for (let index = 0; index < 300 + 1; index++) {
		cart[index] = 0;
	}
	return cart;
};

const ShopContextProvider = (props) => {
	const [allProducts, setAllProducts] = useState([]);
	const [cartItems, setCartItems] = useState(getDefaultCart());
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`${url}/allproducts`)
			.then((res) => res.json())
			.then((data) => {
				setAllProducts(data);
			});

		if (localStorage.getItem("auth-token")) {
			fetch(`${url}/getcart`, {
				method: "POST",
				headers: {
					Accept: "application/form-data",
					"auth-token": `${localStorage.getItem("auth-token")}`,
					"Content-Type": "application/json",
				},
				body: "",
			})
				.then((res) => res.json())
				.then((data) => setCartItems(data));
		}
	}, []);

	const addToCart = (itemId) => {
		if (!localStorage.getItem("auth-token")) {
			navigate("/login");
		}

		setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] ? prev[itemId] + 1 : 1 }));

		fetch(`${url}/addtocart`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"auth-token": `${localStorage.getItem("auth-token")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				itemId: itemId,
			}),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((error) => console.error("Error adding to cart:", error));
	};

	const removeFromCart = (itemId) => {
		setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
		if (localStorage.getItem("auth-token")) {
			fetch(`${url}/removefromcart`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"auth-token": `${localStorage.getItem("auth-token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					itemId: itemId,
				}),
			})
				.then((res) => res.json())
				.then((data) => console.log(data))
				.catch((error) => console.error("Error adding to cart:", error));
		}
	};

	useEffect(() => {
		// console.log("Cart Items Updated:", cartItems);
	}, [cartItems]);

	const getTotalAmount = () => {
		let totalAmount = 0;
		for (const item in cartItems) {
			if (cartItems[item] > 0) {
				let itemInfo = allProducts.filter((product) => product.id === Number(item));
				totalAmount += cartItems[item] * itemInfo[0].new_price;
				// console.log(totalAmount)
			}
		}
		return totalAmount;
	};

	const getTotalCartItems = () => {
		let totalItems = 0;
		for (const item in cartItems) {
			if (cartItems[item] > 0) {
				totalItems += cartItems[item];
			}
		}
		return totalItems;
	};

	const contextValue = {
		allProducts,
		cartItems,
		addToCart,
		removeFromCart,
		getTotalAmount,
		getTotalCartItems,
	};

	return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
