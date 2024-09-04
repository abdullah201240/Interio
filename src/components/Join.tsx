import React from 'react';
import img1 from '../assets/img/250949.png';

export default function Join() {
  return (
    <div style={{ backgroundColor: 'rgb(241, 241, 241)', padding: '40px 0' }}>
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-md-6 mb-4 order-md-2">
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Join the Interio Community</h2>
              <br></br>
              <br></br>
              <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                We invite you to join the Interio community and embark on a journey of discovery and creativity. Sign up for our newsletter to stay updated on new arrivals, exclusive offers, and design inspiration. Follow us on social media to connect with fellow design enthusiasts and share your own Interio experiences.
                Thank you for choosing Interio. We look forward to helping you create a space that you love.
              </p>
            </div>
          </div>
          <div className="col-md-6 mb-4 order-md-1">
            <img src={img1} alt='Story' className="img-fluid rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
