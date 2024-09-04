import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Terms from './Terms';
import Landing from './Landing';
import Refund from './Refund';
import Shipping from './Shipping';
import UserLogin from './UserLogin';
import UserSignup from './UserSignup';
import Cart from './Cart';
import SubCategories from './SubCategories';
import AllProduct from './AllProduct';
import AboutUs from './AboutUs';
import Contact from './Contact';
import Product from './Product';
import UserHome from './UserHome';
import AdminHome from './AdminHome';
import AllProducts from './AllProducts';
import AdminLogin from './AdminLogin';
import AllOrder from './AllOrder';
import AdminCreateSubAdmin from './AdminCreateSubAdmin';
import AllAdmin from './AllAdmin';
import AdminHeroSection from './AdminHeroSection';
import AdminCategories from './AdminCategories';

import Payment from './Payment';
import Success from './Success';
import Fail from './Fail';
import Cancel from './Cancel';
import UserProfile from './UserProfile';
import AddProducts from './AddProducts';
import Privacy from './Privacy';
import Cancellation from './Cancellation';
import Order from './Order';
import Myorder from './Myorder';
import AdminOrder from './AdminOrder';
import Customers from './Customers';
import NewEntry from './NewEntry';
import AdminCreateOrder from './AdminCreateOrder';
import AdminMyOrder from './AdminMyOrder';
import AdminProfile from './AdminProfile';

export default function NavigationStack() {


  return (
    <div>

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/terms-conditions' element={<Terms />} />
        <Route path='/shipping-delivery' element={<Shipping />} />
        <Route path='/refund-returns' element={<Refund />} />
        <Route path='/user/login' element={<UserLogin />} />
        <Route path='/user/register' element={<UserSignup />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product-category/:categoryId' element={<SubCategories />} />
        <Route path='/allproduct/:Id' element={<AllProduct />} />
        {/* <Route path='/product/:Id' element={<AllProduct />} /> */}



        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact-us' element={<Contact />} />
        <Route path='/product-details/:categoryId' element={<Product />} />
        <Route path='/user-home' element={<UserHome />} />
        <Route path='/admin-home' element={<AdminHome />} />
        <Route path='/admin/all-products' element={<AllProducts />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/all/order' element={<AllOrder />} />
        <Route path='/admin/subadmin' element={<AdminCreateSubAdmin />} />
        <Route path='/admin/adminlist' element={<AllAdmin />} />
        <Route path='/admin/hero/section' element={<AdminHeroSection />} />
        <Route path='/admin/categories' element={<AdminCategories />} />
        <Route path='/admin/order' element={<AdminOrder />} />
        <Route path='/admin/customers' element={<Customers />} />
        <Route path='/admin/profile' element={<AdminProfile />} />
        <Route path='/admin/create-order' element={<AdminCreateOrder />} />
        <Route path='/admin/myorder' element={<AdminMyOrder />} />


        <Route path='/:categoryName/:subCategoryName' element={<SubCategories />} />
        <Route path='/user/payment' element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/fail" element={<Fail />} />
        <Route path="/cancel" element={<Cancel />} />
        
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path='/admin/add/products' element={<AddProducts />} />
        <Route path='/admin/new/entry' element={<NewEntry />} />


        <Route path='/privacy' element={<Privacy />} />
        
        <Route path='/cancellation' element={<Cancellation />} />
        <Route path='/order' element={<Order />} />
        <Route path='/myorder' element={<Myorder />} />



        

        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
