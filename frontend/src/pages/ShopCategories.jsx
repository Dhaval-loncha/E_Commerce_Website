import { useContext } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../context/ShopContext";
import dropDown from "../assets/icons/dropdown_icon.png";
import Item from "../components/Item/Item";

const ShopCategories = (props) => {
	const { allProducts } = useContext(ShopContext);

	return (
		<div className="shop-category">
			<img className="shop-category-banner" src={props.banner} alt="" />
			<div className="shop-category-index">
				<p>
					<span>Showing 1-12</span> out of 36 products
				</p>
				<div className="shop-category-sort">
					Sort by <img src={dropDown} alt="" />
				</div>
			</div>
			<div className="shop-category-products">
				{allProducts.map((item, i) => {
					if (props.category === item.category) {
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
					}
				})}
			</div>
      <div className="shop-category-load-more">
        Explore More
      </div>
		</div>
	);
};

export default ShopCategories;
