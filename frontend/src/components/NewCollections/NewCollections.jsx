import "./NewCollections.css";
import Item from "../Item/Item.jsx";
import { useEffect, useState } from "react";

const NewCollections = () => {
	const [newCollection, setNewCollection] = useState([]);
	// const url = "http://localhost:4000";
	const url = "https://e-commerce-website-backend-x6ht.onrender.com";

	useEffect(() => {
		fetch(`${url}/newcollections`)
			.then((res) => res.json())
			.then((data) => {
				setNewCollection(data);
			});
	}, []);

	return (
		<div className="new-collections">
			<h1>NEW COLLECTIONS</h1>
			<hr />
			<div className="collections">
				{newCollection.map((item, i) => {
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

export default NewCollections;
