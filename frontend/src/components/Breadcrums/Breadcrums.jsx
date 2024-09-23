import "./Breadcrums.css";
import arrowIcon from "../../assets/icons/breadcrum_arrow.png";

const Breadcrums = (props) => {
	const { product } = props;

	return (
		<div className="breadcrums">
			HOME <img src={arrowIcon} alt="" /> SHOP <img src={arrowIcon} alt="" /> {product.category}{" "}
			<img src={arrowIcon} alt="" /> {product.name}
		</div>
	);
};

export default Breadcrums;
