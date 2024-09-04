import React from 'react';
import AccordionSection from './AccordionSection';
import '../assets/css/commitment.css';

const WhyChooseInterio: React.FC = () => {
  const accordionItems = [
    { title: "Quality and Durability", content: "We prioritize quality and durability in all our products, ensuring that your investment lasts for years to come." },
    { title: "Exceptional Service", content: "We provide exceptional service tailored to your needs." },
    { title: "Variety and Style", content: "A wide range of styles to suit your preferences." },
    { title: "Inspiration and Ideas", content: "Get inspired with our innovative designs and ideas." },
  ];

  return (
    <div className="my-5 container1 ">
<h2>Why Choose Interio?</h2>

      <div className="row justify-content-center">
        <div className="col-lg-11">
          <div className="row">
            <div className="col-md-6">
            <br></br>
              <AccordionSection items={accordionItems.slice(0, 2)} />
            </div>
            <div className="col-md-6">
            <br></br>
              <AccordionSection items={accordionItems.slice(2)} />
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 container1 commitment-section">
        <h2 >Our Commitment</h2>
        <br></br>
        <br></br>
        <div className="card p-5 card1">
        
          <p className="text-center mb-0" style={{color:'black'}}>
            At Interio, we are committed to sustainability and ethical sourcing. We strive to work with suppliers who share our values and adhere to fair trade practices. Our goal is to offer products that are not only beautiful and functional but also environmentally responsible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseInterio;
