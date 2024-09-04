import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from './hooks/useLogin';
import axios from 'axios';
import { API_BASE_URL, API_BASE_URL_IMAGE } from '../config';
import Navbar from './Navbar';
import Categories from './Categories';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';
import DOMPurify from 'dompurify';

// Define TypeScript interfaces for your data
interface Product {
  id: number;
  productName: string;
  productDescription: string;
  pricePerUnit: string;
  image: string;
  productCategory: string;
  productSubCategory: string;



}

const AllProduct: React.FC = () => {
  const { Id } = useParams<{ Id: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { email } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Id) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/user/productSubCategoryId/${Id}`);
        console.log(response.data.products)
        setProducts(response.data.products); // Assuming response.data.product is an array of products
      } catch (err) {
        setError('No product found');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [Id]);

  if (loading) return <p>Loading...</p>;
  if (error) return (

    <div>
      <Navbar isLoggedIn={!!email} userHomeLink="/user-home" />
      <br></br>
      <br></br>
      <br></br>
      <h3 style={{ textAlign: 'center' }}>No Product Found</h3>

      <Footer />
    </div>
  );
  const firstProduct = products[0];

  return (
    <div>
      <Navbar isLoggedIn={!!email} userHomeLink="/user-home" />

      <div className="product-page-container">
        <Categories />
        <h4 className="mb-4" style={{ paddingLeft: '8%' }}>
          <FontAwesomeIcon icon={faHouse} />
          Home / {firstProduct?.productCategory || 'Category'} / {firstProduct?.productSubCategory || 'Product Sub Category'}

        </h4>
        <div className="container my-5">

          <div className="row">
            {products &&
              (
                products.map((item) => (
                  <div key={item.id} className="col-md-3 mb-4">
                    <div className="card h-100">
                      <img
                        className="card-img-top"
                        src={`${API_BASE_URL_IMAGE}/${item.image}`}
                        alt={item.productName}

                      />
                      <div className="card-body">
                        <h5 className="card-title" style={{color:'blue'}}>{item.productName}</h5>

                        <p  style={{color:'black'}}>
                          <div
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.productDescription) }}
                          />


                        </p>

                        <p className="product-price" style={{ color: 'black' }}>{item.pricePerUnit} BDT</p>
                        <button
                          onClick={() => navigate(`/product-details/${item.id}`)}
                          className="btn btn-primary"
                        >
                          See Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllProduct;
