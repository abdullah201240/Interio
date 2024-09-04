import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Categories from './Categories';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import img1 from '../assets/img/interior-design-with-armchair-potted-plant.png';
import img2 from '../assets/img/scandinavian-living-room-interior-design-zoom-background.png';
import img3 from '../assets/img/3d-rendering-modern-dining-room-living-room-with-luxury-decor.png';
import Story from '../assets/img/Story.png';
import '../assets/css/AboutUs.css';
import WeOffer from './WeOffer';
import WhyChooseInterio from './WhyChooseInterio';
import Join from './Join';
import { useAppSelector } from './hooks/useLogin';


export default function AboutUs() {
    const { email } = useAppSelector((state) => state.auth);
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>

            <Navbar
             isLoggedIn={!!email}  
                
              userHomeLink="/user-home" 
            />
            <Categories />
 </div>
            <div className="about-us-section">
                <br></br>
                
               
                <div className="container ">
                    <h6 ><FontAwesomeIcon icon={faHouse} /> Home / ABOUT US</h6>
                </div>

                <div className="container my-5">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-4">
                            <h2>Welcome to Interio</h2>
                            <br></br>
                            <br></br>
                            <p>Welcome to Interio, your premier destination for stylish and high-quality interior products. At Interio, we believe that your living space should reflect your personality, taste, and lifestyle. Our mission is to help you transform your home into a haven of comfort, beauty, and functionality with our wide range of interior products.</p>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="welcome-images">
                                <div>
                                    <img src={img1} alt='img1' className="img-fluid rounded" />
                                </div>
                                <div>
                                    <div className="row">
                                        <div className="col">
                                            <img src={img2} alt='img2' className="img-fluid rounded" />
                                        </div>
                                        <div className="col">
                                            <img src={img3} alt='img3' className="img-fluid rounded mt-3" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-center my-5">
                        <div className="col-md-6 mb-4 order-md-2">
                            <h2>Our Story</h2>
                            <br></br>
                            <br></br>
                            <p>Interio was founded with a simple yet powerful vision: to make exquisite interior design accessible to everyone. We understand that creating a beautiful home is a deeply personal journey, and we are here to support you every step of the way. With a passion for design and a commitment to excellence, our team carefully curates a diverse selection of products that cater to various styles and preferences.</p>

                        </div>
                        <div className="col-md-6 mb-4 order-md-1">
                            <img src={Story} alt='Story' className="img-fluid rounded" />

                        </div>
                    </div>
                </div>
                
               
            </div>
            <WeOffer/>
                <WhyChooseInterio/>
            <Join />
            <Footer />

            


           

        </div>

    );
}
