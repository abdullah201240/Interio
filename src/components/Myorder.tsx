import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Categories from './Categories';
import { useAppSelector } from './hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/Myorder.css';
import { API_BASE_URL, API_BASE_URL_IMAGE } from '../config';

interface OrderItem {
    productName: string;
    price: number;
    description: string;
    image: string;
    quantity: number;
}

interface Order {
    id: number;
    pay_time: string;
    amount_original: string;
    store_amount: string;
    pay_status: string;
    status: string;
    items: OrderItem[];
}

export default function Myorder() {
    const navigate = useNavigate();
    const { email } = useAppSelector((state) => state.auth);
    const [orders, setOrders] = useState<Order[]>([]);
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        if (!email) {
            navigate('/user/login');
        } else {
            fetch(`${API_BASE_URL}/user/myOrdersByEmail/${email}`)
                .then(response => response.json())
                .then(data => {
                    // Sort orders in descending order by id
                    const sortedOrders = data.sort((a: Order, b: Order) => b.id - a.id);
                    setOrders(sortedOrders);
                })
                .catch(error => console.error('Error fetching orders:', error));
        }
    }, [email, navigate]);

    useEffect(() => {
        if (orders.length > 0) {
            const lastOrder =  orders[0];
            const startTime = new Date(lastOrder.pay_time);
            const timer = setInterval(() => {
                setTimeLeft(calculateTimeLeft(startTime));
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [orders]);

    function calculateTimeLeft(startTime: Date) {
        const now = new Date();
        const timeDifference = startTime.getTime() + 24 * 60 * 60 * 1000 - now.getTime();
        const hours = Math.max(0, Math.floor(timeDifference / (1000 * 60 * 60)));
        const minutes = Math.max(0, Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)));
        const seconds = Math.max(0, Math.floor((timeDifference % (1000 * 60)) / 1000));
        return { hours, minutes, seconds };
    }

    const isOrderCancellable = (payTime: string) => {
        const orderTime = new Date(payTime);
        const now = new Date();
        const timeDifference = now.getTime() - orderTime.getTime();
        return timeDifference <= 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    };

    const renderOrderStatusTracker = (status: string) => {
        const statusSteps = ['Order Processing', 'Order Received', 'Hand Over To Delivery Agent', 'Transport','Completed'];
        const currentStatusIndex = statusSteps.indexOf(status);

        return statusSteps.map((step, index) => (
            <div key={index} className={`status-step ${index <= currentStatusIndex ? 'active' : ''}`}>
                <div className="circle"></div>
                <p>{step}</p>
            </div>
        ));
    };

    const handleCancelOrder = (orderId: number) => {
        const confirmCancel = window.confirm('Are you sure you want to cancel this order?');
        if (confirmCancel) {
            fetch(`${API_BASE_URL}/user/CancelOrder/${orderId}`, {
                method: 'PUT',
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Order cancelled successfully') {
                    alert('Order cancelled successfully');
                    // Optionally refresh or update the order list
                    setOrders(orders.filter(order => order.id !== orderId));
                } else {
                    alert('Failed to cancel the order');
                }
            })
            .catch(error => {
                console.error('Error cancelling order:', error);
                alert('Failed to cancel the order');
            });
        }
    };
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        });
    };
    

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
            <Navbar isLoggedIn={!!email} userHomeLink="/user-home" />
            </div>
            <Categories />
            <div className="container">
                {orders.length > 0 ? (
                    <>
                        <div className="last-order">
                            <h3>Last Order</h3>
                            <div className="countdown">
                                <h4>Countdown to Cancel:</h4>
                                <p>{timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</p>
                            </div>
                            <div className="order-status">
                                <h4>
                                    Order Status:{' '}
                                    <span className={orders[0].status.toLowerCase()}>
                                        {orders[0].status}
                                    </span>
                                </h4>
                                <div className="status-tracker">
                                    {renderOrderStatusTracker(orders[0].status)}
                                </div>
                            </div>
                            <div className="order-summary">
                                <h4>Order Summary</h4>
                                <p><strong>Amount:</strong> {orders[0].amount_original}</p>
                                <p><strong>Payment Status:</strong> {orders[0].pay_status}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>No orders found.</p>
                )}

                {orders.map((order) => (
                    <div key={order.id} className="order-table">
                        <h3>Order ID: {order.id}</h3>
                        <h3>Order Status : {order.status}</h3>
                        <h3>Order Payment: {formatDate(order.pay_time)}</h3>
                        <table className="product-table">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Quantity</th>
                                    <th>Cancel</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map((item, index) => (
                                    <tr key={`${order.id}-${index}`}>
                                        <td>{item.productName}</td>
                                        <td>{item.price}</td>
                                        <td dangerouslySetInnerHTML={{ __html: item.description }}></td>
                                        <td>
                                            <img src={`${API_BASE_URL_IMAGE}/${item.image}`} alt={item.productName} className="product-image" width={100} />
                                        </td>
                                        <td>{item.quantity}</td>
                                        <td>
                                            {isOrderCancellable(order.pay_time) && (
                                                <button className="edit-button1" onClick={() => handleCancelOrder(order.id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}
