require("dotenv").config();

const port = process.env.PORT || 4000;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

app.use(express.json());

const corsOptions = {
	origin: "https://e-commerce-website-frontend-e1xa.onrender.com",
	methods: "GET,POST,PUT,DELETE",
	credentials: true,
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Database connection with MongoDB Atlas
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Error connecting to MongoDB:", err));

// Cloudinary Configuration
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

// Multer Configuration for Cloudinary
const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "product_images", // Folder name in Cloudinary
		allowed_formats: ["jpeg", "png", "jpg"], // Allowed image formats
	},
});

const upload = multer({ storage: storage });

// API creation

app.get("/", (req, res) => {
	res.send("Express app is running");
});

// Endpoint for image upload (Cloudinary)
app.post("/upload", upload.single("product"), (req, res) => {
	res.json({
		success: true,
		image_url: req.file.path, // Cloudinary URL
	});
});

// Schema for creating products

const Product = mongoose.model("Product", {
	id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	new_price: {
		type: Number,
		required: true,
	},
	old_price: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	available: {
		type: Boolean,
		default: true,
	},
});

app.post("/addproduct", async (req, res) => {
	let products = await Product.find({});
	let id;

	if (products.length > 0) {
		let last_product_array = products.slice(-1);
		let last_product = last_product_array[0];
		id = last_product.id + 1;
	} else {
		id = 1;
	}

	const product = new Product({
		id: id,
		name: req.body.name,
		image: req.body.image,
		category: req.body.category,
		new_price: req.body.new_price,
		old_price: req.body.old_price,
	});
	console.log(product);
	await product.save();
	console.log("Saved");
	res.json({
		success: true,
		name: req.body.name,
	});
});

app.post("/removeproduct", async (req, res) => {
	await Product.findOneAndDelete({ id: req.body.id });
	console.log("Removed");
	res.json({
		success: true,
		name: req.body.name,
	});
});

// creating API for get all products

app.get("/allproducts", async (req, res) => {
	let products = await Product.find({});
	console.log("all products fetched");
	res.send(products);
});

// schema for use model

const User = mongoose.model("User", {
	name: {
		type: String,
	},
	email: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
	},
	cartData: {
		type: Object,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

// creating endpoint for sign up

app.post("/signup", async (req, res) => {
	let check = await User.findOne({ email: req.body.email });

	if (check) {
		return res.status(400).json({ success: false, error: "Email already exists" });
	}

	let cart = {};

	for (let i = 0; i < 300; i++) {
		cart[i] = 0;
	}

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		cartData: cart,
	});

	await user.save();

	const data = {
		user: {
			id: user.id,
		},
	};

	const token = jwt.sign(data, process.env.JWT_SECRET);

	res.json({ success: true, token });
});

// creating endpoint for login

app.post("/login", async (req, res) => {
	let user = await User.findOne({ email: req.body.email });
	if (user) {
		const passCompare = req.body.password === user.password;
		if (passCompare) {
			const data = {
				user: {
					id: user.id,
				},
			};
			const token = jwt.sign(data, process.env.JWT_SECRET);
			res.json({ success: true, token });
		} else {
			res.json({ success: false, error: "Invalid Password" });
		}
	} else {
		res.json({ success: false, error: "Invalid Email" });
	}
});

// endpoint for new_collection data

app.get("/newcollections", async (req, res) => {
	let products = await Product.find({});
	let newCollection = products.slice(1).slice(-8);
	console.log("New Collection fetched");
	res.send(newCollection);
});

// endpoint for popular in women

app.get("/popularinwomen", async (req, res) => {
	let products = await Product.find({ category: "women" });
	let popularinwomen = products.slice(4, 8);
	console.log("Popular in women fetched");
	res.send(popularinwomen);
});

// creating middleware for auth

const fetchUser = async (req, res, next) => {
	const token = req.header("auth-token");
	if (!token) {
		res.status(401).send({ error: "Please authenticate using valid token" });
	} else {
		try {
			const data = jwt.verify(token, process.env.JWT_SECRET);
			req.user = data.user;
			next();
		} catch (error) {
			res.status(401).send({ error: "Please authenticate using valid token" });
		}
	}
};

// endpoint for cart data

app.post("/addtocart", fetchUser, async (req, res) => {
	console.log("added", req.body.itemId);
	let userData = await User.findOne({ _id: req.user.id });
	userData.cartData[req.body.itemId] += 1;
	await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
	res.send("Added");
});

// endpoint for remove cart data

app.post("/removefromcart", fetchUser, async (req, res) => {
	console.log("removed", req.body.itemId);
	let userData = await User.findOne({ _id: req.user.id });
	if (userData.cartData[req.body.itemId] > 0) userData.cartData[req.body.itemId] -= 1;
	await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
	res.send("Removed");
});

// endpoint for get cart data

app.post("/getcart", fetchUser, async (req, res) => {
	console.log("Get Cart");

	let userData = await User.findOne({ _id: req.user.id });
	res.json(userData.cartData);
});

app.listen(port, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log(`Backend server is running on port ${port}`);
	}
});
