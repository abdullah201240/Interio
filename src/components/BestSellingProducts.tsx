import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/bestSellingProducts.css';
import { API_BASE_URL, API_BASE_URL_IMAGE } from '../config';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
// types.ts or inside your component file

export interface Product {
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
}

export default function BestSellingProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<{ products: Product[] }>(`${API_BASE_URL}/user/best-selling`); // Adjust the URL as needed
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const loadMoreProducts = () => {
    setVisibleProducts((prevVisible) => prevVisible + 4);
  };

  const handleProductDetails = (productId: number) => {
    navigate(`/product-details/${productId}`);
  };
  return (
    <div className="container my-5">
      <h4 className="mb-4">Best selling products</h4>

      <div className="row">
        {products.slice(0, visibleProducts).map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card h-100">
              <img
                className="card-img-top"
                src={`${API_BASE_URL_IMAGE}/${product.image}`} // TypeScript now recognizes this property
                alt={product.productName} // TypeScript now recognizes this property
              />
              <div className="card-body">
                <h5 className="card-title" style={{ color: 'blue' }}>{product.productName}</h5> {/* TypeScript now recognizes this property */}
                <p style={{ color: 'black' }}>
                  <div
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.productDescription) }}
                  />


                </p>                <p style={{ color: 'orange' }}>৳{product.pricePerUnit}</p> {/* TypeScript now recognizes these properties */}
                <button className="btn btn-primary" onClick={() => handleProductDetails(product.id)}>See Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleProducts < products.length && (
        <div className="text-center">
          <button onClick={loadMoreProducts} className="load-more-btn1">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
