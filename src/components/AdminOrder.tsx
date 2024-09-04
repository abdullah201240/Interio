import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';
import AdminFooter from './AdminFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import "../assets/css/AllProducts.css";
import '../assets/css/Model.css';
import { API_BASE_URL, API_BASE_URL_IMAGE } from '../config';

async function fetchOrders() {
  const response = await fetch(`${API_BASE_URL}/admin/allorder`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return response.json();
}

async function updateOrderStatus(id: number, status: string) {
  const response = await fetch(`${API_BASE_URL}/admin/UpdateOrder/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error('Failed to update order status');
  }
  return response.json();
}

const timeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);
    
    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 },
    ];
  
    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count > 0) {
        return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
      }
    }
    return 'just now';
  };

export default function AdminOrder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingOrder, setEditingOrder] = useState<any | null>(null);
  const [deletingOrder, setDeletingOrder] = useState<any | null>(null);
  const [statusOptions] = useState([
    'Order Processing',
    'Order Received',
    'Hand Over To Delivery Agent',
    'Transport',
    'Completed'
  ]);
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const getOrders = async () => {
        try {
          const data = await fetchOrders();
          const sortedOrders = data.sort((a: any, b: any) => new Date(b.pay_time).getTime() - new Date(a.pay_time).getTime());
          setOrders(sortedOrders);
        } catch (error) {
          setError('Failed to fetch orders.');
        } finally {
          setLoading(false);
        }
      };
  
    getOrders();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredOrders = orders.filter(order =>
    order.id.toString().includes(searchTerm)
  );

  const handleEditClick = (order: any) => {
    setEditingOrder(order);
    setSelectedStatus(order.status);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const handleUpdate = async () => {
    if (!editingOrder || !selectedStatus) return;

    try {
      await updateOrderStatus(editingOrder.id, selectedStatus);
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === editingOrder.id ? { ...order, status: selectedStatus } : order
        )
      );
      setEditingOrder(null);
    } catch (error) {
      setError('Failed to update order status.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: 'rgb(243, 242, 247)' }}>
      <div style={{ background: 'white', borderBottom: '1px solid #e0e0e0', position: 'sticky', top: 0, zIndex: 1000, marginLeft: '16.5%' }}>
        <AdminNavbar />
      </div>
      <br />

      <div style={{ display: 'flex', flex: 1, overflowY: 'auto', flexDirection: 'row' }}>
        <div className="sidebar">
          <Sidebar />
        </div>

        <div className="content-section">
          <div className="header">
            <h2 style={{ color: 'orange' }}>All Orders</h2>
          </div>

          <div className="search-container">
            <input
              type="search"
              id="gsearch"
              name="gsearch"
              placeholder="Search by Order ID..."
              className="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Edit</th>
                    <th>Order ID</th>
                    <th>Pay Time</th>
                    <th>Time</th>
                    <th>Original Amount</th>
                    <th>Store Amount</th>
                    <th>Pay Status</th>
                    <th>Status</th>
                    <th>Items</th>
                    <th>Customer Name</th>
                    <th>Customer Email</th>
                    <th>Customer Phone</th>
                    <th>Customer City</th>
                    <th>Customer House</th>
                    <th>Prduct Quantity</th>

                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <button className="edit-button" onClick={() => handleEditClick(order)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </td>
                      <td>{order.id}</td>
                      <td>{new Date(order.pay_time).toLocaleString()}</td>
                      <td>{timeAgo(order.pay_time)}</td>
                      <td>{order.amount_original}</td>
                      <td>{order.store_amount}</td>
                      <td>{order.pay_status}</td>
                      <td>{order.status}</td>
                      <td>
                        <ul>
                          {order.items.map((item: any, index: number) => (
                            <li key={index}>
                              {item.productName} - {item.quantity} x {item.price} Bdt
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>{order.cus_name}</td>
                      <td>{order.cus_email}</td>
                      <td>{order.cus_phone}</td>
                      <td>{order.cus_city}</td>
                      <td>{order.cus_house}</td>
                      <td>
                        <ul>
                          {order.items.map((item: any, index: number) => (
                            <li key={index}>
                              {item.productName} : {item.mainquantity}
                            </li>
                          ))}
                        </ul>
                      </td>

                      
                      <td>
                        {order.items.map((item: any, index: number) => (
                          <img
                            key={index}
                            src={`${API_BASE_URL_IMAGE}/${item.image}`} // Update this path as needed
                            alt={item.productName}
                            style={{ width: '50px', height: '50px', margin: '5px' }}
                          />
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Edit Order Modal */}
              {editingOrder && (
                <div className="edit-modal">
                  <h3>Edit Order</h3>
                  <label>
                    Status:
                    <select value={selectedStatus} onChange={handleStatusChange}>
                      {statusOptions.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button onClick={handleUpdate}>Update</button>
                  <button onClick={() => setEditingOrder(null)}>Cancel</button>
                </div>
              )}

            </>
          )}
        </div>
      </div>

      <footer>
        <AdminFooter />
      </footer>
    </div>
  );
}
