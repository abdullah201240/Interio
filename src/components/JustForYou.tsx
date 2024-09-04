import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure you have axios installed
import { API_BASE_URL, API_BASE_URL_IMAGE } from '../config';
import { useAppSelector } from './hooks/useLogin';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  productName: string;
  pricePerUnit: string;
  image: string;
  productDescription: string;
}

export default function JustForYou() {
  const { email } = useAppSelector((state) => state.auth);

  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/just-for-you/${email}`);
        setProducts(response.data.products); // Adjust based on your API response
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [email]);

  const loadMoreProducts = () => {
    setVisibleProducts((prevVisible) => prevVisible + 4);
  };
  const handleProductDetails = (productId: number) => {
    navigate(`/product-details/${productId}`);
};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container my-5">
      <h4 className="mb-4">Just For You</h4>
      <div className="row">
        {products.slice(0, visibleProducts).map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card h-100">
              <img className="card-img-top" src={`${API_BASE_URL_IMAGE}/${product.image}`} alt={product.productName} />
              <div className="card-body">
                <h5 className="card-title" style={{color:'blue'}}>{product.productName}</h5>
                <p  style={{color:'black'}}>
                  <div
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.productDescription) }}
                  />


                </p>
                <p style={{ color: 'orange' }}>৳{product.pricePerUnit}</p>
                <button  className="btn btn-primary"  onClick={() => handleProductDetails(product.id)}>See Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleProducts < products.length && (
        <div className="text-center">
          <button onClick={loadMoreProducts} className="load-more-btn">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
