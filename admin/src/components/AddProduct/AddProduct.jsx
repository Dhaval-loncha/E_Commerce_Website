import "./AddProduct.css";
import uploadArea from "../../assets/upload_area.svg";
import { useState } from "react";

const AddProduct = () => {
	const [image, setImage] = useState(null);
	// const url = "http://localhost:4000";
	const url = "https://e-commerce-website-backend-x6ht.onrender.com";

	const [productDetails, setProductDetails] = useState({
		name: "",
		image: "",
		category: "men",
		old_price: "",
		new_price: "",
	});

	const changeHandler = (e) => {
		setProductDetails({
			...productDetails,
			[e.target.name]: e.target.value,
		});
	};

	const imageHandler = (e) => {
		setImage(e.target.files[0]);
	};

	const addProduct = async () => {
		// console.log(productDetails);

		let responseData;
		let product = productDetails;

		let formData = new FormData();
		formData.append("product", image);
		formData.append("upload_preset", "e-commerce-store");
		formData.append("cloud_name", "dansxqfuh");

		await fetch("https://api.cloudinary.com/v1_1/dansxqfuh/upload", {
			method: "POST",
			headers: {
				Accept: "application/json",
			},
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				responseData = data;
			});

		if (responseData.success) {
			product.image = responseData.image_url;
			// console.log(product);

			await fetch(`${url}/addproduct`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(product),
			})
				.then((res) => res.json())
				.then((data) => {
					data.success ? alert("Product added") : alert("Failed");
				});
		} else {
			alert("Failed");
		}
	};

	return (
		<div className="add-product">
			<div className="add-product-item-field">
				<p>Product Title</p>
				<input
					value={productDetails.name}
					onChange={changeHandler}
					type="text"
					name="name"
					placeholder="Type here"
				/>
			</div>
			<div className="add-product-price">
				<div className="add-product-item-field">
					<p>Price</p>
					<input
						value={productDetails.old_price}
						onChange={changeHandler}
						type="text"
						name="old_price"
						placeholder="Type here"
					/>
				</div>
				<div className="add-product-item-field">
					<p>Offer Price</p>
					<input
						value={productDetails.new_price}
						onChange={changeHandler}
						type="text"
						name="new_price"
						placeholder="Type here"
					/>
				</div>
			</div>
			<div className="add-product-item-field">
				<p>Product Category</p>
				<select
					value={productDetails.category}
					onChange={changeHandler}
					name="category"
					className="add-product-selector"
				>
					<option value="men">Men</option>
					<option value="women">Women</option>
					<option value="kids">Kids</option>
				</select>
			</div>
			<div className="add-product-item-field">
				<label htmlFor="file-input">
					<img
						src={image ? URL.createObjectURL(image) : uploadArea}
						className="add-product-thumbnail-img"
						alt=""
					/>
				</label>
				<input type="file" name="image" id="file-input" onChange={imageHandler} hidden />
			</div>
			<button
				onClick={() => {
					addProduct();
				}}
				className="add-product-btn"
			>
				ADD
			</button>
		</div>
	);
};

export default AddProduct;
