import "./Popular.css";
import Item from "../Item/Item.jsx";
import { useEffect, useState } from "react";

const Popular = () => {
	const [popularProducts, setPopularProducts] = useState([]);
	// const url = "http://localhost:4000";
	const url = "https://e-commerce-website-backend-x6ht.onrender.com";

	useEffect(() => {
		fetch(`${url}/popularinwomen`)
			.then((res) => res.json())
			.then((data) => {
				setPopularProducts(data);
			});
	}, []);

	return (
		<div className="popular">
			<h1>POPULAR IN WOMEN</h1>
			<hr />
			<div className="popular-item">
				{popularProducts.map((item, i) => {
					return (
						<Item
							key={i}
							id={item.id}
							image={item.image}
							name={item.name}
							new_price={item.new_price}
							old_price={item.old_price}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Popular;
