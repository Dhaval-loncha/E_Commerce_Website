import "./Hero.css";
import handIcon from "../../assets/icons/hand_icon.png";
import arrowIcon from "../../assets/icons/arrow.png";
import heroImage from "../../assets/icons/hero_image.png";

const Hero = () => {
	return (
		<div className="hero">
			<div className="hero-left">
				<h2>NEW ARRIVALS ONLY</h2>
				<div>
					<div className="hand-icon">
						<p>new</p>
						<img src={handIcon} alt="" />
					</div>
					<p>collection</p>
					<p>for everyone</p>
				</div>
				<div className="hero-latest-btn">
					<div>Latest Collection</div>
					<img src={arrowIcon} alt="" />
				</div>
			</div>
			<div className="hero-right">
				<img src={heroImage} alt="" />
			</div>
		</div>
	);
};

export default Hero;
