// src/components/SubCategoryCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL_IMAGE } from '../config';

interface SubCategory {
    id: string;
    name: string;
    image: string;
}

interface SubCategoryCardProps {
    subCategory: SubCategory;
}

const SubCategoryCard: React.FC<SubCategoryCardProps> = ({ subCategory }) => {
    return (
        <div className="col-md-3 mb-4">
            <div className="card2 h-100">
                <div className="card2-img-wrapper">
                    <img
                        className="card2-img-top"
                        src={`${API_BASE_URL_IMAGE}/${subCategory.image}`}
                        alt={`subcategory ${subCategory.id}`}
                    />
                    <div className="card2-title-overlay">
                        <h5 className="card2-title">{subCategory.name}</h5>
                    </div>
                </div>
                <div className="card2-body">
                    <Link className="see-all-btn" to={`/products/${subCategory.id}`}>
                        See All
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SubCategoryCard;
