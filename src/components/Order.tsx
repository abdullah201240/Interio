import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useAppSelector } from './hooks/useLogin';
import Categories from './Categories';
import axios from 'axios';
import { API_BASE_URL, API_BASE_URL_IMAGE } from '../config';
import DOMPurify from 'dompurify';
import Footer from './Footer';
import { success_url, fail_url, cancel_url, sandboxUrl, signature_key, store_id, merchant_id } from '../config';
import { useNavigate } from 'react-router-dom';

interface CartItemType {
    id: string;
    productImage: string;
    productName: string;
    productDescription: string;
    productPrice: number; // Changed to number
    originalPrice: string;
    productQuantity: number;
}



interface CartSummaryType {
    itemCount: number;
    subtotal: number;
    total: number;
    productIds: number[];
}

export default function Order() {
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [summary, setSummary] = useState<CartSummaryType>({
        itemCount: 0,
        subtotal: 0,
        total: 0,
        productIds: [],
    });
    const { email } = useAppSelector((state) => state.auth);

    // State variables for form fields
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [deliveryOption, setDeliveryOption] = useState('Online Payment');
    const navigate = useNavigate();

    useEffect(() => {
        if (!email) {
            navigate('/user/login');
          }
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/user/view-cart/${email}`);
                setCartItems(response.data.cart);
                setSummary(response.data.summary);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        if (email) {
            fetchCartItems();
        }
    }, [email, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const finalAmount = deliveryOption === 'Cash On Delivery' ? 180 : summary.total;
    
    
        const data = {
            cus_name: name,
            cus_email: email || '',
            cus_phone: phone,
            amount: finalAmount,
            store_id: store_id || '',
            merchant_id: merchant_id || '',
            signature_key: signature_key || '',
            tran_id: Math.floor(Math.random() * 10000),
            success_url: success_url || '',
            fail_url: fail_url || '',
            cancel_url: cancel_url || '',
            currency: "BDT",
            desc: "Payment for order",
            opt_a: city,
            opt_b: address,
            opt_c: deliveryOption,
            
            type: "json"
        };
        console.log(data);
        let uploadAbleData = new FormData();
    
        Object.entries(data).forEach(([key, value]) => {
            uploadAbleData.append(key, value?.toString()); // Convert to string, fallback to empty string if null/undefined
        });
    
        try {
            const response = await axios.post(sandboxUrl, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response)
            
    
            if (response.data.payment_url) {
                window.location.href = response.data.payment_url; // Redirect to Aamarpay
            }
        } catch (error) {
            console.error('Payment initiation error:', error);
        }
    };
    

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
            <Navbar isLoggedIn={!!email} userHomeLink="/user-home" />
            </div>
            <Categories />
            <div className="order-container">
                <div className="order-content">
                    <div className="order-layout">
                        <div className="shipping-billing">
                            <h3>Shipping & Billing Information</h3>
                            <form className="shipping-form" onSubmit={handleSubmit}>
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <label htmlFor="phone">Phone:</label>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    placeholder="Enter Your Phone Number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                                <label htmlFor="districts">City:</label>
                                <select
                                    id="districts"
                                    name="districts"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                >
                                    <option value="">Select District</option>
                                    <option value="Bandar">Bandar</option>
                                    <option value="Bandarban">Bandarban</option>
                                    <option value="Barisal">Barisal</option>
                                    <option value="Bhola">Bhola</option>
                                    <option value="Brahmanbaria">Brahmanbaria</option>
                                    <option value="Chandpur">Chandpur</option>
                                    <option value="Chattogram">Chattogram</option>
                                    <option value="Chuadanga">Chuadanga</option>
                                    <option value="Dhaka">Dhaka</option>
                                    <option value="Dinajpur">Dinajpur</option>
                                    <option value="Faridpur">Faridpur</option>
                                    <option value="Feni">Feni</option>
                                    <option value="Gaibandha">Gaibandha</option>
                                    <option value="Gazipur">Gazipur</option>
                                    <option value="Gopalganj">Gopalganj</option>
                                    <option value="Habiganj">Habiganj</option>
                                    <option value="Jamalpur">Jamalpur</option>
                                    <option value="Jashore">Jashore</option>
                                    <option value="Jatiyo">Jatiyo</option>
                                    <option value="Jhalokati">Jhalokati</option>
                                    <option value="Jhinaidah">Jhinaidah</option>
                                    <option value="Joypurhat">Joypurhat</option>
                                    <option value="Khagrachari">Khagrachari</option>
                                    <option value="Khulna">Khulna</option>
                                    <option value="Kishoreganj">Kishoreganj</option>
                                    <option value="Kotchandpur">Kotchandpur</option>
                                    <option value="Lalmonirhat">Lalmonirhat</option>
                                    <option value="Madaripur">Madaripur</option>
                                    <option value="Magura">Magura</option>
                                    <option value="Manikganj">Manikganj</option>
                                    <option value="Meherpur">Meherpur</option>
                                    <option value="Moulvibazar">Moulvibazar</option>
                                    <option value="Mymensingh">Mymensingh</option>
                                    <option value="Naogaon">Naogaon</option>
                                    <option value="Narail">Narail</option>
                                    <option value="Narsingdi">Narsingdi</option>
                                    <option value="Natore">Natore</option>
                                    <option value="Netrokona">Netrokona</option>
                                    <option value="Nilphamari">Nilphamari</option>
                                    <option value="Noakhali">Noakhali</option>
                                    <option value="Panchagarh">Panchagarh</option>
                                    <option value="Patuakhali">Patuakhali</option>
                                    <option value="Pirojpur">Pirojpur</option>
                                    <option value="Rajbari">Rajbari</option>
                                    <option value="Rajshahi">Rajshahi</option>
                                    <option value="Rangamati">Rangamati</option>
                                    <option value="Rangpur">Rangpur</option>
                                    <option value="Satkhira">Satkhira</option>
                                    <option value="Shariatpur">Shariatpur</option>
                                    <option value="Sherpur">Sherpur</option>
                                    <option value="Sirajganj">Sirajganj</option>
                                    <option value="Sunamganj">Sunamganj</option>
                                    <option value="Sylhet">Sylhet</option>
                                    <option value="Tangail">Tangail</option>
                                    <option value="Thakurgaon">Thakurgaon</option>
                                </select>
                                <label htmlFor="address">Address:</label>
                                <textarea
                                    name="address"
                                    id="address"
                                    placeholder="Enter Your Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                ></textarea>
                                <label htmlFor="delivery-option">Delivery Option:</label>
                                <select
                                    id="delivery-option"
                                    name="delivery-option"
                                    value={deliveryOption}
                                    onChange={(e) => setDeliveryOption(e.target.value)}
                                    required
                                >
                                    <option value="Online Payment">Online Payment</option>
                                    <option value="Cash On Delivery">Cash On Delivery</option>
                                </select>
                                <br></br>
                                <div className="summary-details">
                                <p>Total Items: {summary.itemCount}</p>
                                <p>Subtotal: ৳{summary.subtotal}</p>
                    
                                <h3>Total: ৳{summary.total}</h3>
                            </div>
                            <br></br>
                            <div style={{textAlign:'center'}}>

                                <button  type="submit">Proceed to Payment</button>
                                </div>
                            </form>
                        </div>
                        <div className="order-summary">
                            <h3>Order Summary</h3>
                            <div className="cart-items">
                                {cartItems.map((item) => (
                                    <div className="cart-item" key={item.id}>
                                        <img src={`${API_BASE_URL_IMAGE}/${item.productImage}`} alt={item.productName} />
                                        <div className="cart-item-details">
                                            <h4>{item.productName}</h4>
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: DOMPurify.sanitize(item.productDescription),
                                                }}
                                            />
                                            <div className="price-quantity">
                                                <span className="price">৳{item.productPrice}</span>
                                                <span className="quantity"> Quantity: {item.productQuantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
