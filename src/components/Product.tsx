import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Categories from './Categories';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Container, Table, Button, Spinner } from 'react-bootstrap';
import { useAppSelector } from './hooks/useLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API_BASE_URL, API_BASE_URL_IMAGE } from '../config';
import DOMPurify from 'dompurify';

interface ProductSpecifications {
    [key: string]: string | number;
}

interface Product {
    id: number;
    productCategory: string;
    productCategoryId: string;
    productSubCategoryId: string;
    productSubCategory: string;
    productName: string;
    productCode: string;
    productDescription: string;
    measurementDetails: string;
    applications: string;
    warranty: string;
    pricePerUnit: string;
    unitName: string;
    quantity: string;
    image: string;
    adminEmail: string;
    adminName: string;
    createdAt: string;
    updatedAt: string;
    specifications?: ProductSpecifications;
}

export default function Product() {
    const { categoryId } = useParams<{ categoryId?: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [productError, setProductError] = useState<string | null>(null);
    const { email } = useAppSelector((state) => state.auth);
    const [visibleProducts, setVisibleProducts] = useState(4);
    const [quantity, setQuantity] = useState<number | null>(1);
    const navigate = useNavigate();


    useEffect(() => {
        if (categoryId) {
            fetchProductDetails(categoryId);
            fetchRelatedProducts(categoryId);
        } else {
            setProductError('Product ID is missing.');
        }
    }, [categoryId]);

    const fetchProductDetails = async (productId: string) => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/user/viewProduct/${productId}`);
            setProduct(response.data.products);
        } catch (err) {
            setProductError('Error fetching product details.');
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedProducts = async (productId: string) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/user/related-products/${productId}`);
            setRelatedProducts(response.data.products);
        } catch (err) {
            console.error('Error fetching related products:', err);
        }
    };

    const loadMoreProducts = () => {
        setVisibleProducts((prevVisible) => prevVisible + 4);
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const parsedValue = parseInt(value, 10);

        if (!isNaN(parsedValue) && parsedValue > 0) {
            setQuantity(parsedValue);
        } 
        else if (value === '') {
            setQuantity(null); // Reset to 1 if input is cleared
        }
    };

    const handleAddToCart = async () => {
        if (!email) {
            alert('Please log in to add items to your cart.');
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/user/add-to-cart`, {
                email,
                productId: product?.id,
                quantity,
            });
            

            if (response) {
                navigate('/cart');
            } else {
                alert('Failed to add the product to the cart. Please try again.');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add the product to the cart. Please try again.');
        }
    };















    if (loading) return <Spinner animation="border" variant="primary" />;
    if (productError) return <p className="text-danger">{productError}</p>;



    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
                <Navbar isLoggedIn={!!email} userHomeLink="/user-home" />
            </div>
            <div style={{ background: '#f8f9fa' }}>
                <Categories />
                <h6 style={{ marginLeft: '8%' }}>
                    <FontAwesomeIcon icon={faHouse} />
                    Home / {product?.productCategory || 'Category'} / {product?.productName || 'Product'}
                </h6>
                <Container className="py-4">
                    <div className="d-flex flex-column flex-md-row">
                        {product && (
                            <div className="d-flex flex-column flex-md-row mb-4">
                                <div className="flex-shrink-0">
                                    <img
                                        src={`${API_BASE_URL_IMAGE}/${product.image}`}
                                        alt="Product Preview"
                                        className="img-fluid"
                                        style={{ maxWidth: '400px', borderRadius: '8px' }}
                                    />
                                </div>
                                <div className="ms-3">
                                    <h3>{product.productName}</h3>
                                    <p className="text-success">
                                        {Number(product?.quantity) > 0 ? (
                                            <span>In Stock</span>
                                        ) : (
                                            <span style={{ color: 'red' }}>Stock Out</span>
                                        )}
                                    </p>


                                    <p>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.productDescription) }}
                                        />


                                    </p>
                                    <h4 className="text-primary">
                                        Current price: <span style={{ color: 'orange' }}>{product.pricePerUnit}</span> BDT
                                    </h4>
                                    <div className="d-flex align-items-center mb-3">
                                        <label htmlFor="quantity" className="me-2">Quantity:</label>
                                        <input
                                            type="number"
                                            id="quantity"
                                            name="quantity"
                                            value={quantity === null ? '' : quantity}
                                            onChange={handleQuantityChange}
                                            min="1"
                                            className="form-control w-25"
                                        />
                                    </div>
                                    {Number(product?.quantity) > 0 ? (
                                            <Button onClick={handleAddToCart} className="btn btn-primary">
                                            Add to Cart
                                        </Button>
                                        ) : (
                                            null
                                        )}



                    

                                </div>

                            </div>
                        )}


                    </div>



                    <Container className="my-4">
                        <div style={{ textAlign: 'left' }}>

                            <h4 className="mb-4 border-bottom pb-2" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                Return & Warranty



                            </h4>
                            <br></br>
                            <h5>Cancellation Before Shipment:</h5>
                            <ul>
                                <li>Timeframe: You can cancel your order within 24 hours of placing it, provided it has not been shipped yet.
                                </li>
                                <li>How to Cancel: To cancel your order, log in to your Interio account, go to your order history, and select the order you wish to cancel. Click on the “Cancel Order” button and follow the prompts.

                                </li>
                                <li>Confirmation: Once your cancellation request is processed, you will receive an email confirming the cancellation. Any payments made will be refunded to the original payment method within 7-10 business days.

                                </li>


                            </ul>
                            <h5>Cancellation After Shipment:</h5>
                            <ul>
                                <li>Shipped Orders: If your order has already been shipped, it cannot be canceled. However, you may be eligible to return the product after it has been delivered, subject to our Return Policy.
                                </li>
                                <li>Refusal of Delivery: If you refuse delivery of an order that has already been shipped, the return shipping fees will be deducted from your refund.

                                </li>



                            </ul>

                            <h5>Custom or Made-to-Order Products:
                            </h5>
                            <ul>
                                <li>Custom Orders: Orders for custom or made-to-order products cannot be canceled once production has started. Please contact our customer service team as soon as possible if you need to make changes to a custom order.


                                </li>




                            </ul>
                            <h5>Order Cancellation by Interio:</h5>
                            <ul>
                                <li>Right to Cancel: Interio reserves the right to cancel any order due to stock unavailability, payment issues, or if the order violates our Terms and Conditions.</li>
                                <li>Notification: If your order is canceled by Interio, you will be notified via email, and a full refund will be processed to your original payment method.</li>




                            </ul>
                            <h5>Refund Processing:</h5>
                            <ul>

                                <li>Refund Timeframe: Refunds are typically processed within 7-10 business days. Depending on your bank or payment provider, it may take additional time for the refund to reflect in your account.</li>
                                <li>Payment Method: Refunds will be issued to the original payment method used during purchase. If the payment was made via credit card, the refund will appear on your card statement.</li>

                            </ul>


                        </div>

                    </Container>






                    <Container className="my-4">








                        <h4 className="mb-4 border-bottom pb-2" style={{ fontWeight: 'bold' }}>
                            Specification
                        </h4>
                        <Table bordered>
                            <tbody>
                                {product && (
                                    <><tr>
                                        <td style={{ width: '30%', backgroundColor: '#f1f1f1', fontWeight: 'bold' }}>Product Name</td>
                                        <td>{String(product.productName)}</td> {/* Convert value to string if necessary */}

                                    </tr><tr>
                                            <td style={{ width: '30%', backgroundColor: '#f1f1f1', fontWeight: 'bold' }}>Product Category</td>
                                            <td>{String(product.productCategory)}</td>


                                        </tr>
                                        <tr>
                                            <td style={{ width: '30%', backgroundColor: '#f1f1f1', fontWeight: 'bold' }}>Product Sub Category</td>
                                            <td>{String(product.productSubCategory)}</td> {/* Convert value to string if necessary */}

                                        </tr><tr>
                                            <td style={{ width: '30%', backgroundColor: '#f1f1f1', fontWeight: 'bold' }}>Product Code</td>
                                            <td>{String(product.productCode)}</td>


                                        </tr>
                                        <tr>
                                            <td style={{ width: '30%', backgroundColor: '#f1f1f1', fontWeight: 'bold' }}>Product Description</td>
                                            <td>

                                                <div
                                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.productDescription) }}
                                                />


                                            </td> {/* Convert value to string if necessary */}

                                        </tr><tr>
                                            <td style={{ width: '30%', backgroundColor: '#f1f1f1', fontWeight: 'bold' }}>Measurement Details</td>
                                            <td>
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.measurementDetails) }}
                                                />

                                            </td>


                                        </tr>
                                        <tr>
                                            <td style={{ width: '30%', backgroundColor: '#f1f1f1', fontWeight: 'bold' }}>Applications</td>
                                            <td>
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.applications) }}
                                                />


                                            </td>

                                        </tr><tr>
                                            <td style={{ width: '30%', backgroundColor: '#f1f1f1', fontWeight: 'bold' }}>Warranty</td>
                                            <td>{String(product.warranty)} Months </td>


                                        </tr>
                                        <tr>
                                            <td style={{ width: '30%', backgroundColor: '#f1f1f1', fontWeight: 'bold' }}>Price Per Unit</td>
                                            <td>{String(product.pricePerUnit)}</td>


                                        </tr>
                                        <tr>
                                            <td style={{ width: '30%', backgroundColor: '#f1f1f1', fontWeight: 'bold' }}>Unit Name</td>
                                            <td>{String(product.unitName)}</td>


                                        </tr>







                                    </>
                                )}
                            </tbody>
                        </Table>
                    </Container>


                    <div className="my-5">
                        <h4 className="mb-4">Related Products</h4>
                        <div className="row">
                            {relatedProducts.slice(0, visibleProducts).map((product) => (
                                <div key={product.id} className="col-md-3 mb-4">
                                    <div className="card h-100 shadow-sm">
                                        <img src={`${API_BASE_URL_IMAGE}/${product.image}`} alt={product.productName} style={{ width: '100%', height: 'auto' }} />
                                        <div className="card-body">
                                            <h5 className="card-title" style={{ color: 'black' }}>{product.productName}</h5>

                                            <p className="text-warning">{product.pricePerUnit} BDT</p>

                                            <Link to={`/product-details/${product.id}`} className="btn btn-outline-primary w-100">See Details</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {visibleProducts < relatedProducts.length && (
                            <div className="text-center">
                                <Button onClick={loadMoreProducts} variant="outline-secondary">
                                    Load More
                                </Button>
                            </div>
                        )}
                    </div>
                </Container>

                <Footer />
            </div>
        </div>
    );
}


