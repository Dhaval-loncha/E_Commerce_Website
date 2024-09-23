import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import crossIcon from "../../assets/cross_icon.png";

const ListProduct = () => {
	const [allProducts, setAllProducts] = useState([]);
const url = "http://localhost:4000";


	const fetchInfo = async () => {
		try {
			await fetch(`${url}/allproducts`)
				.then((res) => res.json())
				.then((data) => {
					setAllProducts(data);
				});
		} catch (error) {
			console.log("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchInfo();
	}, []);

	const removeProduct = async (id) => {
		await fetch(`${url}/removeproduct`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: id }),
		});
    await fetchInfo();
	};

	return (
		<div className="list-product">
			<h1>All Products List</h1>
			<div className="list-product-format-main">
				<p className="ma">Products</p>
				<p>Title</p>
				<p className="ma">Old Price</p>
				<p className="ma">New Price</p>
				<p className="ma">Category</p>
				<p className="ma">Remove</p>
			</div>
			<div className="list-product-all-product">
				<hr />
				{allProducts.map((product, i) => {
					return (
						<React.Fragment key={i}>
							<div className="list-product-format-main list-product-format">
								<img src={product.image} alt="" className="list-product-icon ma" />
								<p>{product.name}</p>
								<p className="ma">${product.old_price}</p>
								<p className="ma">${product.new_price}</p>
								<p className="ma">{product.category}</p>
								<img src={crossIcon} alt="" className="list-product-remove ma" onClick={() => removeProduct(product.id)}/>
							</div>
							<hr />
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default ListProduct;
