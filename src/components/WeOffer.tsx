import React from 'react';
import img1 from'../assets/img/Group92.png'
import '../assets/css/WeOffer.css';


export default function WeOffer() {
    return (
<div className="we-offer-container" >
    <div className="row align-items-center">
        <div className="col-md-6 d-flex justify-content-center">
            <div>
                <img src={img1} alt='img1' width={550} className="img-fluid mb-2" />
            </div>
        </div>
        <div className="col-md-4 ">
            <h2>What We Offer</h2>
            <br></br>
              <br></br>
            <p className='justify-content-between '>
                Our extensive catalog features an array of interior  products, including furniture, lighting, decor,
                textiles, and more. Whether you're looking to revamp your living room, update your bedroom, or add a touch
                of elegance to your office,Interio has something for every space and budget. Each item is selected for its
                quality, craftsmanship,and design, ensuring that you receive only the best.
            </p>
        </div>
    </div>
</div>


    );
}
