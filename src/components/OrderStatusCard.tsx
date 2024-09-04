import React, { useState, useEffect } from 'react';
import '../assets/css/OrderStatusCard.css';
import Img from '../assets/img/one.png';
import IMG1 from '../assets/img/image4.png';
import Img2 from '../assets/img/image5.png';
import { API_BASE_URL } from '../config';

function OrderStatusCard() {
  const [orderCounts, setOrderCounts] = useState({
    orderProcessingCount: 0,
    completedCount: 0,
    cancelledCount: 0,
  });

  useEffect(() => {
    // Fetch data from the API
    const fetchOrderCounts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/admin/orderStatus`); // Adjust the URL based on your API setup
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrderCounts(data);
      } catch (error) {
        console.error('Error fetching order counts:', error);
      }
    };

    fetchOrderCounts();
  }, []);

  return (
    <div className="order-status-container">
      <div className="order-status-card" style={{ backgroundColor: 'rgb(145, 129, 217)' }}>
        <div className="order-info" style={{ backgroundColor: 'rgb(145, 129, 217)' }}>
          <h5 className="order-title">ORDER PENDING</h5>
          <h6 className="order-count">{orderCounts.orderProcessingCount}</h6>
        </div>
        <img src={Img} alt="Pending Orders" className="order-image" />
      </div>

      <div className="order-status-card" style={{ backgroundColor: 'rgb(255, 40, 65)' }}>
        <div className="order-info" style={{ backgroundColor: 'rgb(255, 40, 65)' }}>
          <h5 className="order-title">ORDER CANCELLED</h5>
          <h6 className="order-count">{orderCounts.cancelledCount}</h6>
        </div>
        <img src={IMG1} alt="Cancelled Orders" className="order-image" />
      </div>

      <div className="order-status-card" style={{ backgroundColor: 'rgb(47, 184, 228)' }}>
        <div className="order-info" style={{ backgroundColor: 'rgb(47, 184, 228)' }}>
          <h5 className="order-title">ORDER COMPLETE</h5>
          <h6 className="order-count">{orderCounts.completedCount}</h6>
        </div>
        <img src={Img2} alt="Completed Orders" className="order-image" />
      </div>
    </div>
  );
}

export default OrderStatusCard;
