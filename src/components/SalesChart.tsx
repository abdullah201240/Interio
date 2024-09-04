import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

import '../assets/css/SalesChart.css';
import { API_BASE_URL } from '../config';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Order {
  id: number;
  status: string;
  item: string;
  cus_name: string;
  cus_email: string;
  cus_phone: string;
  amount: string;
  city: string;
  house: string;
}

function SalesChart() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Sales',
        data: [],
        fill: false,
        backgroundColor: 'orange',
        borderColor: 'orange',
        pointBackgroundColor: 'blue',
        pointRadius: 5,
      },
    ],
  });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/admin/salesData`);
        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();

    const fetchRecentOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/admin/recentOrder`);
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching recent orders:', error);
      }
    };

    fetchRecentOrders();
  }, []);

  return (
    <div className="dashboard">
      <div className="sales-section">
        <h2>Sales</h2>
        <div className="chart-container">
          <Line data={chartData} />
        </div>
      </div>
      <div className="orders-section">
        <h2>Recent Orders</h2>
        <br></br>
        <br></br>
        <table className="order-table">
          <thead>
            <tr>
              <th>Product Code</th>
              <th>Customer Name</th>
              <th>Customer Email</th>
              <th>Customer Phone</th>
              <th>Amount</th>
              <th>Customer City</th>
              <th>Customer House</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.cus_name}</td>
                <td>{order.cus_email}</td>
                <td>{order.cus_phone}</td>
                <td>{order.amount}</td>
                <td>{order.city}</td>
                <td>{order.house}</td>
                <td>
                  <button className={`status-btn ${order.status.toLowerCase()}`}>{order.status}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesChart;
