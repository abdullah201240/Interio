import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import Sidebar from './Sidebar'
import { API_BASE_URL, API_BASE_URL_IMAGE } from '../config';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


export default function AdminMyOrder() {
    const adminEmail = useSelector((state: RootState) => state.adminAuth.email);

    async function fetchOrders() {
        const response = await fetch(`${API_BASE_URL}/admin/allorderByEmail/${adminEmail}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        return response.json();
      }

      async function updateOrderStatus(id: number, status: string) {
        const response = await fetch(`${API_BASE_URL}/admin/AdminMyUpdateOrder/${id}`, {
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
            <div style={{
                background: 'white',
                borderBottom: '1px solid #e0e0e0',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                marginLeft: '16.5%',
            }}>
                <AdminNavbar />
            </div>
            <div style={{ display: 'flex', flex: 1, overflowY: 'auto', padding: '20px', gap: '20px' }}>
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="content-section">
          <div className="header">
            <h2 style={{ color: 'orange' }}>My Orders</h2>
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
     
                    <th>Status</th>
                    <th>Items</th>
                    <th>Customer Name</th>
                    <th>Customer Email</th>
                    <th>Customer Phone</th>
                    <th>Customer City</th>
                    <th>Customer House</th>
                    <th>Main Quantity</th>

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


        </div>
    )
}
