import React, { useEffect, useState } from "react";
import "../assets/css/AlertTable.css"; // Import your CSS file for styling
import img from '../assets/img/CC-02.png'; // Sample image to be used
import { API_BASE_URL, API_BASE_URL_IMAGE } from "../config";

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
}

const AlertTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/admin/lowStockProducts`); // Replace with your API endpoint
        const result = await response.json();
        if (result.success) {
          setProducts(result.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="alert-table-container" style={{ background: 'white' }}>
      <h2>Alert</h2>
      <br />
      <br />

      <table className="alert-table">
        <thead>
          <tr>
            <th>Product Code</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Price Per Unit</th>
            <th>Admin Name</th>
            <th>Description</th>
            <th>Measurement Details</th>
            <th>Applications</th>
            <th>Warranty</th>
            <th>Unit Name</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.productCode}</td>
              <td>
                <a href={`${API_BASE_URL_IMAGE}/${product.image}`}>
                <img src={`${API_BASE_URL_IMAGE}/${product.image}`} alt="Item" className="item-image" /></a> 
              </td>
              <td>{product.productName}</td>
              <td>{product.quantity}</td>
              <td>{product.productCategory}</td>
              <td>{product.productSubCategory}</td>
              <td>{product.pricePerUnit}</td>
              <td>{product.adminName}</td>
              <td dangerouslySetInnerHTML={{ __html: product.productDescription}}></td>
              <td dangerouslySetInnerHTML={{ __html: product.measurementDetails}}></td>
              <td dangerouslySetInnerHTML={{ __html: product.applications}}></td>
              <td>{product.warranty}</td>
              <td>{product.unitName}</td>
              <td>{new Date(product.createdAt).toLocaleDateString()}</td>
              <td>{new Date(product.updatedAt).toLocaleDateString()}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertTable;
