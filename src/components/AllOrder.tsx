import React, { useState } from 'react'
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';
import AdminFooter from './AdminFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import img from '../assets/img/CC-02.png';
import "../assets/css/AllProducts.css"; 

export default function AllOrder() {
    const [searchTerm, setSearchTerm] = useState('');

    const data = [
        { id: 1, OrderID: "7859", Location: "Corporate Chair", price: "500", Date: "19" },
        { id: 2, OrderID: "7860", Location: "Executive Chair", price: "600", Date: "10" },
        { id: 3, OrderID: "7861", Location: "Ergonomic Chair", price: "700", Date: "19" },
        { id: 4, OrderID: "7862", Location: "Gaming Chair", price: "800", Date: "10" },
    ];

    const handleSearchChange = (e: { target: { value: string; }; }) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // Filter data based on the search term
    const filteredData = data.filter(item =>
        item.OrderID.toLowerCase().includes(searchTerm) ||
        item.Location.toLowerCase().includes(searchTerm) ||
        item.Date.toLowerCase().includes(searchTerm) ||

        item.price.toLowerCase().includes(searchTerm) 
        
        
    );
  return (
    <div className="all-products-container">
            <header className="navbar-container">
                <AdminNavbar />
            </header>

            <div className="main-content">
                <aside className="sidebar">
                    <Sidebar />
                </aside>

                <div className="content-section">
                <div className="header">
                        <h2 style={{color:'orange'}}>All Order</h2>
                        
                    </div>
                   

                    <div className="search-container">
                        <input 
                            type="search" 
                            id="gsearch" 
                            name="gsearch" 
                            placeholder="Search products..." 
                            className="search-input" 
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Edit</th>
                                <th>Order ID</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Price</th>
                                <th>Track</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <button className="edit-button">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                    </td>
                                    <td>{item.OrderID}</td>
                                    <td>{item.Location}</td>
                                    <td>
                                        <img src={img} alt={`Item ${item.OrderID}`} className="item-image" />
                                    </td>
                                    <td>{item.Date}</td>
                                    <td>{item.price}</td>
                                    
                                    <td>
                                        <button className="edit-button1">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <footer>
                <AdminFooter />
            </footer>
        </div>
  )
}
