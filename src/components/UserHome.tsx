import React, { useEffect } from 'react';
import Footer from './Footer';
import AllCategories from './AllCategories';
import Categories from './Categories';
import WhyChooseInterio from './WhyChooseInterio';
import Steps from './Steps';
import HeroSection from './HeroSection';
import JustForYou from './JustForYou';
import '../assets/css/slider.css';
import BestSellingProducts from './BestSellingProducts';
import { useAppSelector } from './hooks/useLogin';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar'
import { useDispatch } from 'react-redux';

export default function UserHome() {
  const location = useLocation();
  const { paymentData } = location.state || {};
  const { email } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!email) {
      navigate('/user/login');
    }
  }, [email, navigate]);


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>


        <Navbar
          isLoggedIn={true}
          userHomeLink="/user-home"




        />
         <Categories />
      </div>
      <br></br>
      <div style={{ background: '#F1F1F1' }}>
       
        <HeroSection />
        <AllCategories />
        <JustForYou />
        <BestSellingProducts />
        <WhyChooseInterio />
      </div>
      <Steps />
      <Footer />
    </div>
  );
}

