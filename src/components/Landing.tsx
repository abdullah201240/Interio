import Footer from './Footer';
import AllCategories from './AllCategories';
import Categories from './Categories';
import WhyChooseInterio from './WhyChooseInterio';
import BestSellingProducts from './BestSellingProducts';
import Steps from './Steps';
import HeroSection from './HeroSection';
import '../assets/css/slider.css'
import { useAppSelector } from './hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
export default function Landing() {
    const { email } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      navigate('/user-home');
    }
  }, [email, navigate]);
 

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}></div>
        <div>
          <Navbar
          isLoggedIn={false} 
          userHomeLink="/user-home" 
          />
          </div>

            
            <div style={{ background: '#F1F1F1' }}>
            <br></br>
                <Categories />
                <HeroSection/>
                <AllCategories/>
                <BestSellingProducts/>
                <WhyChooseInterio/>

            </div>
            <Steps/>

            <Footer />
        </div>
    );
}
