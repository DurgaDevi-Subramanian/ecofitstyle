import React from 'react';
import './Home.css';
import leftImage from './assets/images/left-image.jpg';  
import rightImage from './assets/images/right-image.jpg'; 

const Home = () => {
    return (
        <div className="home">
            <div className="home-images">
                <img src={leftImage} alt="Left Side" className="home-image left-image" />
				<img src={rightImage} alt="Right Side" className="home-image right-image" />
            </div>
            <h2>Welcome to EcoFitStyle</h2>
            <p className="intro">Transform Your Fashion, Sustainably!</p>
            <p>
                At EcoFitStyle, we believe that looking good and doing good can go hand in hand. Our mission is to revolutionize your fashion experience by combining style with sustainability. Here’s what you can expect:
            </p>
            <div className="overview">
                <h3>Perfect Fit, Perfect Style</h3>
                <p>
                    Discover the ideal outfits tailored just for you. Our advanced body shape analyzer will help you find dresses that complement your unique figure. Say goodbye to ill-fitting clothes and hello to your new favorite wardrobe pieces!
                </p>
                <h3>Fashion with a Conscience</h3>
                <p>
                    Choose from our curated selection of eco-friendly and sustainable fashion. From summer breezes to winter warmth, we offer garments made from natural fibers and crafted with care. Feel good knowing your fashion choices are kind to the planet.
                </p>
                <h3>Easy Donations, Big Impact</h3>
                <p>
                    Give your pre-loved clothes a second life! Donate your gently used items through our simple and secure process. Our team ensures that your donations are verified, picked up, and delivered to those in need, with a reward system to thank you for your generosity.
                </p>
            </div>
            <q>
                Join us on a journey where style meets sustainability. Dive in now and make a difference with every outfit!
            </q>
        </div>
    );
};

export default Home;
