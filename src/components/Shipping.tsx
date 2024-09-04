import React from 'react';

import Navbar from './Navbar';
import Footer from './Footer';
import Logo from '../assets/img/logo.png';
import Categories from './Categories';
import '../assets/css/Shipping.css'
import { useAppSelector } from './hooks/useLogin';
export default function Shipping() {
  const { email } = useAppSelector((state) => state.auth);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <Navbar
             isLoggedIn={!!email}  
                
              userHomeLink="/user-home" 
            />
            </div>
        <br/>
       <Categories />
       <br></br>
       <div  className='container2 py-4'  style={{ backgroundColor: 'rgb(242, 238, 232)', maxWidth:'90%', marginLeft:'5%' }}>
      <div className="container  py-4">
       
        <h2 className="my-4">Shipping & Delivery</h2>
        <br></br>
        <br></br>

        <p className="text-justify">
          Once our system processes your order, your products are inspected thoroughly to ensure they are in a perfect condition.
          After they pass through the final round of quality check, they are packed and handed over to our trusted delivery partner.
          Our delivery partners then bring the package to you at the earliest possibility. In case, they are unable to reach your provided address or at a suitable time, they will contact you to resolve the issue.
          We maintain a ‘closed box delivery’ policy, which is crucial to ensure the authenticity of the products, privacy of the customers, and product adulteration or modification prevention.
        </p>
        <h4>How are items packaged?</h4>
        <p className="text-justify">
          We package our products in cardboard boxes with your invoice wrapped along with it. Each individual product is carefully packaged while fragile items like bottles are safely secured with bubble wrap.
        </p>
       </div> 
       <div style={{marginLeft:'1%'}}> 
      
        <h4>What are the delivery charges?</h4>
       
        <p className="text-justify">
          Delivery charge may vary for different products. We will confirm the delivery charge while confirming the order.
        </p>
        <h4>What is the estimated delivery time?</h4>
        <p className="text-justify">
          Inside Dhaka: 1-2 days<br />
          Outside Dhaka: 3-5 days
        </p>
        <p className="text-justify">
          However, the delivery might be delayed based on political, environmental, transportation, or any other unavoidable issues, which will be notified by our customer relationship team.
        </p>
        
      <br></br>
      <br></br>
      </div>
      </div>
      <Footer />
    </div>
  );
}
