import React, { useEffect, useState } from 'react';
import '../assets/css/cart.css';
import Navbar from './Navbar';
import { useAppSelector } from './hooks/useLogin';
import Categories from './Categories';
import Footer from './Footer';
import axios from 'axios';
import { API_BASE_URL, API_BASE_URL_IMAGE } from '../config';
import DOMPurify from 'dompurify';
import { Link, useNavigate } from 'react-router-dom';

// Define the type for cart item
interface CartItemType {
  id: string; // Unique identifier for the cart item
  productImage: string;
  productName: string;
  productDescription: string;
  productPrice: string;
  originalPrice: string;
  productQuantity: number;
  productId: string;
}

// Define the type for summary
interface CartSummaryType {
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  total: number;
}

function Cart() {
  const [isEmpty, setIsEmpty] = useState(false); // New state to track if cart is empty

  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [summary, setSummary] = useState<CartSummaryType>({
    itemCount: 0,
    subtotal: 0,
    shippingFee: 0,
    total: 0,
  });

  const { email } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/view-cart/${email}`);
      const { cart, summary, message } = response.data;
      
      if (message === "Cart is empty") {
        setIsEmpty(true);
        setCartItems([]);
        setSummary(summary);
      } else {
        setIsEmpty(false);
        setCartItems(cart);
        setSummary(summary);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    
    fetchCartItems();
  }, [email]);

  useEffect(() => {
    if (!email) {
      navigate('/user/login');
    }
  }, [email, navigate]);
  

  const handleRemoveItem = async (itemId: string) => {
    try {
      // Make the API call to remove the item from the cart
      await axios.delete(`${API_BASE_URL}/user/remove-from-cart`, {
        params: { email, productId: itemId },
      });
      fetchCartItems();
      // Update the cart items and summary locally
      const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
      updateCart(updatedCartItems);
      

  
    } catch (error) {
      console.error('Error removing item from cart:', error);
      await fetchCartItems();

    }
  };
  
  const updateCart = (updatedCartItems: CartItemType[]) => {
    // Recalculate the summary
    const updatedItemCount = updatedCartItems.length;
    const updatedSubtotal = updatedCartItems.reduce(
      (total, item) => total + parseFloat(item.productPrice) * item.productQuantity,
      0
    );
    const updatedTotal = updatedSubtotal + summary.shippingFee;
  
    setCartItems(updatedCartItems);
    setSummary({
      itemCount: updatedItemCount,
      subtotal: updatedSubtotal,
      shippingFee: summary.shippingFee,
      total: updatedTotal,
    });
  };
  

  const CartItem: React.FC<{ item: CartItemType }> = ({ item }) => (
    <div className="cart-item">
      <img src={`${API_BASE_URL_IMAGE}/${item.productImage}`} alt={item.productName} />
      <div className="item-details">
        <h4>{item.productName}</h4>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(item.productDescription),
          }}
        />
        <p>
          {item.productPrice} <span>{item.originalPrice}</span>
        </p>
      </div>
      <div className="quantity-controls">
        <input
          type="number"
          value={item.productQuantity}
          readOnly
        />
      </div>
      <button
        className="remove-item"
        onClick={() => handleRemoveItem(item.productId)}
      >
        🗑️
      </button>
    </div>
  );

  const CartSummary: React.FC<{ summary: CartSummaryType }> = ({ summary }) => (
    <div className="cart-summary">
      <h4>Invoice and Contact Info</h4>
      <p>Subtotal ({summary.itemCount} items): ৳{summary.subtotal.toFixed(2)}</p>
     
      <p>Total: ৳{summary.total.toFixed(2)}</p>
      <Link to='/order' className="checkout-button">PROCEED TO CHECKOUT</Link>
      <br></br>
      <br></br>
      <h4 className="mb-4 border-bottom pb-2" style={{ fontWeight: 'bold' }}>
        Return & Warranty
      </h4>
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
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <Navbar isLoggedIn={!!email} userHomeLink="/user-home" />
      <div style={{ background: '#f8f9fa' }}>
        <Categories />
        </div>
        <div className="cart">
          {isEmpty   ? (
            <div className="no-products-message">
              <h2>No Products Added</h2>
              <br></br>
              <br></br>
              <p>Your cart is currently empty. Please add some products to your cart to proceed with checkout.</p>
              <Link to='/user-home' className="shop-now-button">Shop Now</Link>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              <CartSummary summary={summary} />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
