import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';
import AdminFooter from './AdminFooter';
import "../assets/css/AllProducts.css";
import { API_BASE_URL, API_BASE_URL_IMAGE } from '../config';

async function fetchAllUser() {
    const response = await fetch(`${API_BASE_URL}/admin/findAllUsers`);

    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }
    return response.json();
}

export default function Customers() {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchAllUser();
                setUsers(data);
            } catch (error) {
                setError('Failed to fetch users.');
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm)
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };
    function calculateAge(dateOfBirth: string) {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

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
                        <h2 style={{ color: 'orange' }}>All Users</h2>
                    </div>

                    <div className="search-container">
                        <input
                            type="search"
                            id="gsearch"
                            name="gsearch"
                            placeholder="Search by User Name..."
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
                        <div>
                            <table className="product-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>City</th>
                                        <th>House</th>
                                        <th>Account Opening Date</th>
                                        <th>Date Of Birth</th>
                                        <th>Age</th>
                                        <th>Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.city}</td>
                                            <td>{user.house}</td>
                                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td>{new Date(user.dob).toLocaleDateString()}</td>
                                            <td>{calculateAge(user.dob)}</td>
                                            <td>
                                                <a href={`${API_BASE_URL_IMAGE}/upload/${user.image}`}>
                                                    <img
                                                        src={
                                                            user.image && user.image.startsWith('https://lh3.googleusercontent.com')
                                                                ? user.image
                                                                : user.image
                                                                     `${API_BASE_URL_IMAGE}/upload/${user.image}`
                                                                    
                                                        }
                                                        alt={user.image ? 'Profile image' : 'Default profile image'}
                                                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}

                                                    />




                                                   
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <footer>
                        <AdminFooter />
                    </footer>
                </div>
            </div>
        </div>
    );
}
