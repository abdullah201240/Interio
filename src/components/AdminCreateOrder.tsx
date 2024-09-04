import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import AdminFooter from './AdminFooter';
import DOMPurify from 'dompurify';
import { fetchProducts } from './api/productApi';
import AddToCartModal from './AddToCartModal';
import OrderModal from './AdminOrderModal';
import axios from 'axios';
import { API_BASE_URL, API_BASE_URL_IMAGE } from '../config';

export interface Product {
    id: number;
    productCode: string;
    productName: string;
    productCategory: string;
    productSubCategory?: string | null;
    productDescription: string;
    measurementDetails: string;
    applications: string;
    warranty: string;
    pricePerUnit: string;
    unitName: string;
    quantity: number;
    image: File | string;
    adminEmail: string;
    adminName: string;
    productQuantity: string;
    productPrice: string;
    productImage: string;
    productSubcategory: string;
    productId: string;


}
interface CartSummaryType {
    itemCount: number;
    subtotal: number;
    total: number;
    productIds: number[];
}

export default function AdminCreateOrder() {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState<Product[]>([]); // Initialized with an empty array
    const [showAddToCartModal, setShowAddToCartModal] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const adminEmail = useSelector((state: RootState) => state.adminAuth.email);
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<Product[]>([]); // Initialized with an empty array
    const [summary, setSummary] = useState<CartSummaryType>({
        itemCount: 0,
        subtotal: 0,
        total: 0,
        productIds: [],
    });

    useEffect(() => {
        if (!adminEmail) {
            navigate('/admin/login');
        }
    }, [adminEmail, navigate]);

    const getCartItems = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/view-cart/${adminEmail}`);
            const result = await response.json();
            if (response.ok) {
                setCartItems(result.cart || []); // Fallback to an empty array if undefined
                setSummary(result.summary);
            } else {
                console.error('Error fetching cart items:', result);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetchProducts();
                if (response && Array.isArray(response.products)) {
                    setProducts(response.products.map((product: Product) => ({
                        ...product,
                        productCode: product.productCode ?? '',
                        productName: product.productName ?? '',
                        pricePerUnit: product.pricePerUnit ?? '',
                        quantity: product.quantity ?? 0,
                    })));
                } else {
                    console.error('Data fetched is not an array:', response);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        getProducts();
        getCartItems();
    }, [adminEmail]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredData = products.filter(item =>
        (item.productName?.toLowerCase() ?? '').includes(searchTerm)
    );

    const handleShowAddToCartModal = (product: Product) => {
        setSelectedProduct(product);
        setShowAddToCartModal(true);
    };

    const handleCloseAddToCartModal = () => setShowAddToCartModal(false);

    const handleAddToCart = async (quantity: number) => {
        if (selectedProduct) {
            try {
                const response = await fetch(`${API_BASE_URL}/admin/add-to-cart`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: adminEmail,
                        productId: selectedProduct.id,
                        quantity,
                    }),
                });

                const result = await response.json();
                if (response.ok) {
                    alert("Added to cart successfully!");
                    getCartItems();
                } else {
                    alert("Failed to add to cart.");
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const handleRemoveItem = async (itemId: string) => {
        try {
            await axios.delete(`${API_BASE_URL}/admin/remove-from-cart`, {
                params: { email: adminEmail, productId: itemId },
            });
            getCartItems();
        } catch (error) {
            console.error('Error removing item from cart:', error);
            getCartItems();
        }
    };
    
    const handleCreateOrder = async (paymentData: any) => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/adminOrderPlace`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cus_email: paymentData.cus_email,
                    cus_phone: paymentData.cus_phone,
                    cus_name: paymentData.cus_name,
                    city: paymentData.city,
                    house: paymentData.house,
                    adminEmail: adminEmail,
                    total: summary.total
                }),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Order created successfully!');
                navigate('/admin/myorder');
            } else {
                alert('Failed to create order.');
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowOrderModal(true);
    };

    return (
        <div>
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
                        <div>
                            <h1>Total Price:<span style={{color:'orange'}}>{summary.total}</span>  Bdt</h1>
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Product Id</th>
                                        <th>Category</th>
                                        <th>Sub Category</th>
                                        <th>Description</th>
                                        <th>Price Per Unit</th>
                                        <th>Quantity</th>
                                        <th>Image</th>
                                        <th>Admin Email</th>
                                        <th>Admin Name</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.length > 0 ? cartItems.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.productName}</td>
                                            <td>{item.productId}</td>
                                            <td>{item.productCategory}</td>
                                            <td>{item.productSubcategory}</td>
                                            <td>
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.productDescription) }}
                                                />
                                            </td>
                                            <td>{item.productPrice}</td>
                                            <td>{item.productQuantity}</td>
                                            <td>
                                                <img src={`${API_BASE_URL_IMAGE}/${item.productImage}`} alt={`Item ${item.productCode}`} className="item-image" />
                                            </td>
                                            <td>{item.adminEmail}</td>
                                            <td>{item.adminName}</td>
                                            <td>
                                                <button
                                                    className="remove-item"
                                                    onClick={() => handleRemoveItem(String(item.productId))}
                                                >
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={11}>No items in the cart.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <br />
                            <div style={{ textAlign: 'center' }}>
                                <button className="btn btn-primary" onClick={handleSubmit}>Create Order</button>
                            </div>
                            <br />
                            <br />
                        </div>

                        <div className="search-container">
                            <input
                                type="search"
                                id="gsearch"
                                name="gsearch"
                                placeholder="Search products name..."
                                className="search-input"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>

                        <table className="product-table">
                            <thead>
                                <tr>
                                    <th>Add</th>
                                    <th>Product Code</th>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Sub Category</th>
                                    <th>Description</th>
                                    <th>Measurement Details</th>
                                    <th>Applications</th>
                                    <th>Warranty</th>
                                    <th>Price Per Unit</th>
                                    <th>Unit Name</th>
                                    <th>Quantity</th>
                                    <th>Image</th>
                                    <th>Admin Email</th>
                                    <th>Admin Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? filteredData.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            <button
                                                className="add-to-cart"
                                                onClick={() => handleShowAddToCartModal(item)}
                                            >
                                                ➕
                                            </button>
                                        </td>
                                        <td>{item.productCode}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.productCategory}</td>
                                        <td>{item.productSubCategory}</td>
                                        <td>
                                            <div
                                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.productDescription) }}
                                            />
                                        </td>
                                        <td>
                                            <div
                                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.measurementDetails) }}
                                            />
                                        </td>
                                        <td>
                                            <div
                                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.applications) }}
                                            />
                                        </td>
                                        <td>{item.warranty}</td>
                                        <td>{item.pricePerUnit}</td>
                                        <td>{item.unitName}</td>
                                        <td>{item.quantity}</td>
                                        <td>
                                            <img src={`${API_BASE_URL_IMAGE}/${item.image}`} alt={`Item ${item.productCode}`} className="item-image" />
                                        </td>
                                        <td>{item.adminEmail}</td>
                                        <td>{item.adminName}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={15}>No products found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {selectedProduct && (
                <AddToCartModal
                    show={showAddToCartModal}
                    handleClose={handleCloseAddToCartModal}
                    product={selectedProduct}
                    onAdd={handleAddToCart}
                />
            )} 
             <OrderModal
                show={showOrderModal}
                handleClose={() => setShowOrderModal(false)}
                onSubmit={handleCreateOrder}
            />
            <AdminFooter/>
        </div>
    );
}

