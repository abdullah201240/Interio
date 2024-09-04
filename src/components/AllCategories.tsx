import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCategories } from './api/categoryApi'; // Adjust the path as needed
import '../assets/css/categories.css';
import { API_BASE_URL, API_BASE_URL_IMAGE } from '../config';
import { Spinner } from 'react-bootstrap';

export default function AllCategories() {
    const navigate = useNavigate();
    const { data: categories = [], isLoading, error } = useGetCategories();

    const handleCategoryClick = async (categoryId: string) => {
        try {
           
                navigate(`/product-category/${categoryId}`); // Navigate to subcategories page
           
        } catch (err) {
            
        }
        
    };

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Spinner animation="border" role="status" size="sm">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Spinner animation="border" role="status" size="sm">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h4 className="mb-4">Categories</h4>
            <div className="row">
                {categories.map((category: any) => (
                    <div key={category.id} className="col-md-3 mb-4">
                        <div className="card2 h-100">
                            <div className="card2-img-wrapper">
                                <img
                                    className="card2-img-top"
                                    src={`${API_BASE_URL_IMAGE}/${category.image}`}
                                    alt={`category ${category.name}`}
                                />
                                <div className="card2-title-overlay">
                                    <h5 className="card2-title">{category.name}</h5>
                                </div>
                            </div>
                            <div className="card2-body">
                                <button
                                    className="see-all-btn"
                                    onClick={() => handleCategoryClick(category.id)}
                                >
                                    See All
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
