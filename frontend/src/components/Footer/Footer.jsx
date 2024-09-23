import "./Footer.css";
import footerLogo from "../../assets/logo_big.png";
import instagram from "../../assets/icons/instagram_icon.png";
import pintrest from "../../assets/icons/pintester_icon.png";
import whatsapp from "../../assets/icons/whatsapp_icon.png";

const Footer = () => {
	return (
		<div className="footer">
			<div className="footer-logo">
				<img src={footerLogo} alt="" />
				<p>SHOPPER</p>
			</div>
			<ul className="footer-links">
				<li>Company</li>
				<li>Products</li>
				<li>Offices</li>
				<li>About</li>
				<li>Contact</li>
			</ul>
			<div className="footer-social">
				<div className="footer-icons">
					<img src={instagram} alt="" />
				</div>
				<div className="footer-icons">
					<img src={pintrest} alt="" />
				</div>
				<div className="footer-icons">
					<img src={whatsapp} alt="" />
				</div>
			</div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - All Rights Reserved</p>
      </div>
		</div>
	);
};

export default Footer;
