import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import "./CartItems.css";
import removeIcon from "../../assets/icons/cart_cross_icon.png";

const CartItems = () => {
	const { allProducts, cartItems, removeFromCart, getTotalAmount } = useContext(ShopContext);

	return (
		<div className="cart-items">
			<div className="cart-items-main">
				<p>Products</p>
				<p>Title</p>
				<p>Price</p>
				<p>Quantity</p>
				<p>Total</p>
				<p>Remove</p>
			</div>
			<hr />
			{allProducts.map((e) => {
				if (cartItems[e.id] > 0) {
					return (
						<div key={e.id}>
							<div className="cart-items-format cart-items-main">
								<img src={e.image} alt="" className="cart-items-image" />
								<p>{e.name}</p>
								<p>${e.new_price}</p>
								<button className="cart-items-quantity">{cartItems[e.id]}</button>
								<p>${e.new_price * cartItems[e.id]}</p>
								<img
									src={removeIcon}
									onClick={() => {
										removeFromCart(e.id);
									}}
									className="cart-items-remove"
									alt=""
								/>
							</div>
							<hr />
						</div>
					);
				}
				return null;
			})}
			<div className="cart-items-down">
				<div className="cart-items-total">
					<h1>Cart Totals</h1>
					<div>
						<div className="cart-items-total-items">
							<p>Subtotal</p>
							<p>${getTotalAmount()}</p>
						</div>
						<hr />
						<div className="cart-items-total-items">
							<p>Shipping Fee</p>
							<p>Free</p>
						</div>
						<hr />
						<div className="cart-items-total-items">
							<h3>Total</h3>
							<h3>${getTotalAmount()}</h3>
						</div>
					</div>
					<button>PROCEED TO CHECKOUT</button>
				</div>
				<div className="cart-items-promocode">
					<p>If you have a promo code, Enter it here</p>
					<div className="cart-items-promo-box">
						<input type="text" placeholder="Promo Code" />
						<button>APPLY</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItems;
