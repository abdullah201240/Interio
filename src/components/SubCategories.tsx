import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetSubCategoriesByCategory } from './api/categoryApi'; // Adjust the import path as needed
import '../assets/css/categories.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import Footer from './Footer';
import Categories from './Categories';
import { API_BASE_URL, API_BASE_URL_IMAGE } from '../config';
import axios from 'axios';
import { useAppSelector } from './hooks/useLogin';

// Define a type for subCategory based on expected API response
interface SubCategory {
    id: string;
    name: string;
    image: string;
    cname?: string; // optional if not always present
}

export default function SubCategories() {
    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
    const [displayingProducts, setDisplayingProducts] = useState<boolean>(false);
    const navigate = useNavigate();
    const { categoryId } = useParams<{ categoryId: string }>();
    const { data: subCategories, isLoading, error } = useGetSubCategoriesByCategory(categoryId || '');
    const [loading, setLoading] = useState(false);
    const [productError, setProductError] = useState<string | null>(null);
    const [products, setProducts] = useState<any[]>([]);
    const { email } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!subCategories || subCategories.length === 0) {
            fetchProduct(categoryId || '');
        }
    }, [subCategories, categoryId]);

    const fetchProduct = async (Id: string) => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/user/products/${Id}`);
            setProducts(response.data.product); // Assuming the response is an array of products
        } catch (err) {
           
        } finally {
            setLoading(false);
        }
    };

    const handleSeeAllClick = async (subCategory: SubCategory) => {
        setSelectedSubCategory(subCategory);
        setDisplayingProducts(true);
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/user/productSubCategoryId/${subCategory.id}`);
            setProducts(response.data.products); 
            setProductError(null);
        } catch (err) {
            setProductError('Error fetching products for the selected subcategory.');
        } finally {
            setLoading(false);
        }
    };

    const handleProductDetails = (productId: string) => {
        navigate(`/product-details/${productId}`);
    };

    if (isLoading || loading) return <p>Loading...</p>;
    if (error) return <p>Error loading subcategories: {error.message}</p>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
            <Navbar isLoggedIn={!!email} userHomeLink="/user-home" />
            </div>
            <div style={{ background: '#F1F1F1' }}>
                <Categories />
                <h6 style={{ paddingLeft: '8%' }} className="mb-4">
                    <FontAwesomeIcon icon={faHouse} /> Home/
                    {subCategories && subCategories.length > 0 ? subCategories[0].cname : 'Default Category Name'}
                </h6>
                <div className="container my-5">
                    <div className="row">
                        {!displayingProducts && subCategories && subCategories.length > 0 ? (
                            subCategories.map((subCategory: SubCategory) => (
                                <div key={subCategory.id} className="col-md-3 mb-4">
                                    <div className="card2 h-100">
                                        <div className="card2-img-wrapper">
                                            <img
                                                className="card2-img-top"
                                                src={`${API_BASE_URL_IMAGE}/${subCategory.image}`}
                                                alt={`subcategory ${subCategory.id}`}
                                            />
                                            <div className="card2-title-overlay">
                                                <h5 className="card2-title" style={{ color: 'black' }}>{subCategory.name}</h5>
                                            </div>
                                        </div>
                                        <div className="card2-body">
                                            <button
                                                className="see-all-btn"
                                                onClick={() => handleSeeAllClick(subCategory)}
                                            >
                                                See All
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            products.map((item, index) => (
                                <div key={index} className="col-md-3 mb-4">
                                    <div className="card1">
                                        <img
                                            className="card2-img-top"
                                            src={`${API_BASE_URL_IMAGE}/${item.image}`} // Assuming each product has an image URL
                                            alt={item.name}
                                        />
                                        <div className="card-body">
                                            <h3 className="card-title" style={{ color: 'Black' }} >{item.productName}</h3>
                                            <p>{item.description}</p>
                                            <p style={{ color: 'orange' }}>{item.pricePerUnit} BDT</p>
                                            
                                            <button
                                            
                                                onClick={() => handleProductDetails(item.id)}
                                                className="see-all-btn"
                                            >
                                                See Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        {productError && <p>{productError}</p>}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
