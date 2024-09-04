import React, { useState } from 'react';
import { faCartShopping, faCircleUser, faClipboardCheck, faEnvelope, faPhoneVolume, faSearch, faShippingFast, faSignOutAlt, faUndoAlt, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/img/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL, API_BASE_URL_IMAGE } from '../config';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { clearAuth } from './redux/authSlice';
import '../assets/css/navbar.css';
import { useAppSelector } from './hooks/useLogin';

// Define the props interface
interface NavbarProps {
    isLoggedIn: boolean;
    userHomeLink: string;
    onLogout?: () => void;
}

export default function Navbar({ isLoggedIn, userHomeLink, onLogout }: NavbarProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useAppSelector((state) => state.auth);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = async () => {
        if (onLogout) {
            onLogout();
        } else {
            try {
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                await axios.get(`${API_BASE_URL}/user/logout`, { headers }); 
                dispatch(clearAuth());
                navigate('/user/login');
            } catch (error) {
                console.error('Error during logout:', error);
            }
        }
    };

    const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchTerm(query);

        if (query.trim() === '') {
            setSearchResults([]);
            return;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/user/searchproduct/${query}`);
            setSearchResults(response.data);
            if (response.data.length > 0) {
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="contact-bar">
                <FontAwesomeIcon icon={faPhoneVolume} className="fa-icon" />
                <h1 className="contact-info">+8801896121201</h1>
                <FontAwesomeIcon icon={faEnvelope} className="fa-icon" />
                <h1 className="contact-info">service@interiobd.com</h1>
            </div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to={isLoggedIn ? userHomeLink : "/"}>
                    <img src={logo} alt="Logo" className="navbar-logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item search-item">
                            <div className='search-bar'>
                                <input
                                    className="form-control"
                                    type="search"
                                    placeholder="Search for products..."
                                    aria-label="Search"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about-us">ABOUT US</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                HELP & SUPPORT
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/shipping-delivery"><FontAwesomeIcon icon={faShippingFast} /> Shipping & Delivery</Link>
                                <Link className="dropdown-item" to="/terms-conditions"><FontAwesomeIcon icon={faClipboardCheck} /> Terms and Conditions</Link>
                                <Link className="dropdown-item" to="/refund-returns"><FontAwesomeIcon icon={faUndoAlt} /> Refund and Return Policy</Link>
                                <Link className="dropdown-item" to="/privacy"><FontAwesomeIcon icon={faShieldHalved} /> Privacy Policy</Link>
                                <Link className="dropdown-item" to="/cancellation"><FontAwesomeIcon icon={faUndoAlt} /> Cancellation Policy</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact-us">CONTACT US</Link>
                        </li>
                        {isLoggedIn ? (
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownUser" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: '24px' }} />
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownUser">
                                    <Link className="dropdown-item" to="/user/profile"><FontAwesomeIcon icon={faShippingFast} /> My Account</Link>
                                    <Link className="dropdown-item" to="/myorder"><FontAwesomeIcon icon={faClipboardCheck} /> My Orders</Link>
                                    <div className="dropdown-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                                    </div>
                                </div>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/user/login">LOGIN</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/user/register">SIGN UP</Link>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                <FontAwesomeIcon icon={faCartShopping} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Bootstrap Modal for Search Results */}
            {/* Bootstrap Modal for Search Results */}
            <div className={`modal fade ${isModalOpen ? 'show' : ''}`} style={{ display: isModalOpen ? 'block' : 'none' }} tabIndex={-1} role="dialog" aria-labelledby="searchResultsModalLabel" aria-hidden={!isModalOpen}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="searchResultsModalLabel">Search Results</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {searchResults.length > 0 ? (
                                <ul className="list-group">
                                    {searchResults.map((result, index) => (
                                        <li key={index} className="list-group-item">
                                            <Link to={`/product-details/${result.id}`} className="search-result-link">
                                            <img src={`${API_BASE_URL_IMAGE}/${result.image}`} alt={result.productName} width={80} height={80}  />
                                            
                                            <br></br>
                                                <p>{result.productName}</p>
                                                
                                                <p>{result.productCode}</p>
                                                <p>{result.pricePerUnit}</p>
                                                
                                               
                                                

                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No results found.</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
