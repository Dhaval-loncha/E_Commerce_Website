import "./RelatedProducts.css";
import dataProducts from "../../data/data.js";
import Item from "../Item/Item.jsx";

const RelatedProducts = () => {
	return (
		<div className="related-products">
			<h1>Related Products</h1>
			<hr />
			<div className="related-products-items">
				{dataProducts.map((item, i) => {
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

export default RelatedProducts;
