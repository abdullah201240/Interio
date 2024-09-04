// Payment.js
import React from 'react';
import axios from 'axios';

const sandboxUrl = 'https://secure.aamarpay.com/index.php';

const Payment = () => {
  const handlePayment = async () => {
    const data = {
      cus_name: "rayhan",
      cus_email: "r@gmail.com",
      cus_phone: "01767766789",
      amount: 10,
      tran_id: Math.floor(Math.random() * 10000),
      signature_key: "004abeea2ce47c9e352404f03e1a7167",
      store_id: "interiobd",
      success_url: "example.com",
      fail_url: "example.com",
      cancel_url: "example.com",
      currency: "BDT",
      desc: "Description",
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "0",
      cus_country: "Bangladesh",
      type: "json"

    };


    let uploadAbleData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      uploadAbleData.append(key, value.toString());
    });

    try {
      const response = await axios.post(sandboxUrl, uploadAbleData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      if (response.data.payment_url) {
        window.location.href = response.data.payment_url; // Redirect to Aamarpay
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
    }
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;
