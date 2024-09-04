import React from 'react';
import '../assets/css/steps.css';
import Step from '../assets/img/steps.png';

export default function Steps() {
    return (
        <div>
            <div className='text-center'>
            <h2>Frequently Asked Questions</h2>
                <br></br>
                <br></br>
                
            </div>

            <div className="text-left">
            <br></br>
               
                <h5>How do I place an order at Interio?</h5>
                <p>You can place your order in a few simple steps:</p>
            </div>
            <div className="container text-center my-5 px-3">

                <div>
                    <img src={Step} alt='steps' className="img-fluid" />
                </div>
                <br />
                <br />
                </div>
                <div className="text-left">
                    <p>Can I use my Master/VISA/American Express card to purchase your products from your website?</p>
                    <button className="btn btn-warning btn-block my-2" aria-label="Yes, you can use your card">Yes, you can.</button>
                    <p>Can I bkash the amount to purchase my desired product from the website?</p>
                    <button className="btn btn-warning btn-block my-2" aria-label="Yes, you can bkash the amount">Yes, you can.</button>
                </div>
                <div className="faq text-left mt-4">
                    <p>
                        You have to bkash the full amount of your desired product/s along with home delivery fee by using the ‘Make Payment’ option to our bKash merchant number. No bKash charge will be applicable in this case.
                    </p>
                    <h3 className="text-warning">What is your delivery fee inside Dhaka?</h3>
                    <ul>
                        <li>Delivery charge may vary for different products. We will confirm the delivery charge while confirming the order.</li>
                    </ul>
                    <h3 className="text-warning">Do you deliver outside Dhaka? Which delivery service do you use?</h3>
                    <ul>
                        <li>Yes, we do deliver all over Bangladesh. We use third-party courier service to deliver our products.</li>
                    </ul>
                </div>
            </div>
    );
}
