import "./ProductDisplay.css";
import starIcon from "../../assets/icons/star_icon.png";
import starDullIcon from "../../assets/icons/star_dull_icon.png";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

const ProductDisplay = (props) => {
	const { product } = props;
	const { addToCart } = useContext(ShopContext);

	return (
		<div className="product-display">
			<div className="product-display-left">
				<div className="product-display-img-list">
					<img src={product.image} alt="" />
					<img src={product.image} alt="" />
					<img src={product.image} alt="" />
					<img src={product.image} alt="" />
				</div>
				<div className="product-display-img">
					<img className="product-display-main-image" src={product.image} alt="" />
				</div>
			</div>
			<div className="product-display-right">
				<h1>{product.name}</h1>
				<div className="product-display-right-star">
					<img src={starIcon} alt="" />
					<img src={starIcon} alt="" />
					<img src={starIcon} alt="" />
					<img src={starIcon} alt="" />
					<img src={starDullIcon} alt="" />
					<p>(122)</p>
				</div>
				<div className="product-display-right-prices">
					<div className="old-price">${product.old_price}</div>
					<div className="new-price">${product.new_price}</div>
				</div>
				<div className="product-display-description">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit voluptatem deserunt,
					enim rerum aliquam quibusdam assumenda inventore. Nostrum quod voluptatem hic ab ex quae nobis,
					nemo, nulla earum iusto odio!
				</div>
				<div className="product-display-size">
					<h1>Select Size</h1>
					<div className="product-display-sizes">
						<div>S</div>
						<div>M</div>
						<div>L</div>
						<div>XL</div>
						<div>XXL</div>
					</div>
				</div>
				<button onClick={() => {addToCart(product.id)}}>Add To Cart</button>
				<p className="product-display-category">
					<span>Category : </span>Women, Tshirt, Croc Top
				</p>
				<p className="product-display-category">
					<span>Tags : </span>Modern, Latest
				</p>
			</div>
		</div>
	);
};

export default ProductDisplay;
