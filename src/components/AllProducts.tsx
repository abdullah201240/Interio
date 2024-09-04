import React, { useState, useEffect, useMemo } from 'react';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';
import AdminFooter from './AdminFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import "../assets/css/AllProducts.css";
import { Link } from 'react-router-dom';
import { fetchProducts, deleteProduct, updateProduct } from './api/productApi'; // Adjust import path as needed
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { API_BASE_URL, API_BASE_URL_IMAGE } from '../config';
import DOMPurify from 'dompurify';
import JoditEditor from 'jodit-react';

export interface Category {
    id: string;
    name: string;
}

export interface SubCategory {
    id: string;
    name: string;
}
interface ExampleProps {
    placeholder?: string;
}
export interface Product {
    id: number;
    productCode: string;
    productName: string;
    productCategory: string;
    productSubCategory?: string | null;
    productDescription: string;
    measurementDetails: string;
    applications: string;
    warranty: string;
    pricePerUnit: string;
    unitName: string;
    quantity: number;
    image: File | string; // File or string (URL)
    adminEmail: string;
    adminName: string;
}

export default function AllProducts({ placeholder }: ExampleProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState<Product>({
        id: 0,
        productCode: '',
        productName: '',
        productCategory: '',
        productSubCategory: '',
        productDescription: '',
        measurementDetails: '',
        applications: '',
        warranty: '',
        pricePerUnit: '',
        unitName: '',
        quantity: 0,
        image: '',
        adminEmail: '',
        adminName: '',
    });
    
    const handleEditorChange = (fieldName: string) => (content: string) => {
        setUpdatedProduct({
            ...updatedProduct,
            [fieldName]: content,
        });
    };

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetchProducts();
                if (response && Array.isArray(response.products)) {
                    setProducts(response.products.map((product: { productCode: any; productName: any; pricePerUnit: any; quantity: any; }) => ({
                        ...product,
                        productCode: product.productCode ?? '',
                        productName: product.productName ?? '',
                        pricePerUnit: product.pricePerUnit ?? '',
                        quantity: product.quantity ?? 0,
                        // Add other default values if necessary
                    })));
                } else {
                    console.error('Data fetched is not an array:', response);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
    
        getProducts();
    }, []);
    

   

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setUpdatedProduct({
            ...updatedProduct,
            [e.target.name]: e.target.value,
        });
        
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUpdatedProduct({
                ...updatedProduct,
                image: URL.createObjectURL(e.target.files[0]) // Create a URL for the file object
            });
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredData = products.filter(item =>
       
        (item.productName?.toLowerCase() ?? '').includes(searchTerm)
       
    );
    

    const handleEditClick = (product: Product) => {
        
        setUpdatedProduct(product);
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                setProducts(products.filter(product => product.id !== id));
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const handleUpdateProduct = async () => {
        try {
            const formData = new FormData();
            formData.append('id', updatedProduct.id.toString());
            formData.append('productCode', updatedProduct.productCode);
            formData.append('productName', updatedProduct.productName);
            formData.append('productCategory', updatedProduct.productCategory);
            formData.append('productSubCategory', updatedProduct.productSubCategory || '');
            formData.append('productDescription', updatedProduct.productDescription);
            formData.append('measurementDetails', updatedProduct.measurementDetails);
            formData.append('applications', updatedProduct.applications);
            formData.append('warranty', updatedProduct.warranty);
            formData.append('pricePerUnit', updatedProduct.pricePerUnit);
            formData.append('unitName', updatedProduct.unitName);
            formData.append('quantity', updatedProduct.quantity.toString());
            formData.append('adminEmail', updatedProduct.adminEmail);
            formData.append('adminName', updatedProduct.adminName);
        
            // Append image if it's a File
            if (updatedProduct.image instanceof File) {
                formData.append('image', updatedProduct.image);
            }
        
            const response = await fetch(`${API_BASE_URL}/admin/products/${updatedProduct.id}`, {
                method: 'PUT',
                body: formData,
            });
        
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to update product: ${errorData.message || 'Unknown error'}`);
            }
    
            // Assuming the response contains the updated product data
            const updatedProductData = await response.json();
    
            // Update local state with the updated product data
            setProducts(products.map(product => product.id === updatedProduct.id ? updatedProductData : product));
    
            // Close the modal
            setShowModal(false);
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product. Please try again.'); // Provide user feedback
        }
    };
    
    
    
    const config = useMemo(() => ({
        readonly: false,
        placeholder: placeholder || 'Start typing...'
    }), [placeholder]);


    return (
        <div style={{ display: 'flex', flexDirection: 'column', background: 'rgb(243, 242, 247)' }}>
            <div style={{ background: 'white', borderBottom: '1px solid #e0e0e0', position: 'sticky', top: 0, zIndex: 1000, marginLeft: '16.5%' }}>
                <AdminNavbar />
            </div>

            <br />

            <div style={{ display: 'flex', flex: 1, overflowY: 'auto', flexDirection: 'row' }}>
                <div className="sidebar">
                    <Sidebar />
                </div>

                <div className="content-section">
                    <div >
                        <h2 style={{ color: 'orange' }}>All Products</h2>
                        
                        <Link className="btn btn-primary" to="/admin/new/entry" style={{marginLeft:'10%'}}>
                            <FontAwesomeIcon icon={faPlus} className="icon" />
                            Add Entry
                        </Link>
                        <Link className="btn btn-success" to="/admin/add/products" style={{marginLeft:'10%'}}>
                            <FontAwesomeIcon icon={faPlus} className="icon" />
                            New Product
                        </Link>
                        <br></br>
                        <br></br>
                    </div>

                    <div className="search-container">
                        <input
                            type="search"
                            id="gsearch"
                            name="gsearch"
                            placeholder="Search products name..."
                            className="search-input"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Edit</th>
                                <th>Product Code</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Sub Category</th>
                                <th>Description</th>
                                <th>Measurement Details</th>
                                <th>Applications</th>
                                <th>Warranty</th>
                                <th>Price Per Unit</th>
                                <th>Unit Name</th>
                                <th>Quantity</th>
                                <th>Image</th>
                                <th>Admin Email</th>
                                <th>Admin Name</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <button className="edit-button" onClick={() => handleEditClick(item)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                    </td>
                                    <td>{item.productCode}</td>
                                    <td>{item.productName}</td>
                                    <td>{item.productCategory}</td>
                                    <td>{item.productSubCategory}</td>
                                    <td>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.productDescription) }}
                                        />
                                    </td>
                                    <td>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.measurementDetails) }}
                                        />
                                    </td>
                                    <td>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.applications) }}
                                        />
                                    </td>
                                    <td>{item.warranty}</td>
                                    <td>{item.pricePerUnit}</td>
                                    <td>{item.unitName}</td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        <img src={`${API_BASE_URL_IMAGE}/${item.image}`} alt={`Item ${item.productCode}`} className="item-image" />
                                    </td>
                                    <td>{item.adminEmail}</td>
                                    <td>{item.adminName}</td>
                                    <td>
                                        <button className="edit-button1" onClick={() => handleDelete(item.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>

            <footer>
                <AdminFooter />
            </footer>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formProductCode">
                            <Form.Label>Product Code</Form.Label>
                            <Form.Control
                                type="text"
                                name="productCode"
                                value={updatedProduct.productCode}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formProductName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="productName"
                                value={updatedProduct.productName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                       
                        <Form.Group className="mb-3" controlId="productDescription">
                            <Form.Label>Product Description</Form.Label>
                            <JoditEditor
                                value={updatedProduct.productDescription}
                                config={config}
                                onChange={handleEditorChange('productDescription')}
                                />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="measurementDetails">
                            <Form.Label>Measurement Details</Form.Label>
                            <JoditEditor
                                value={updatedProduct.measurementDetails}
                                config={config}
                                onChange={handleEditorChange('measurementDetails')}
                                />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="applications">
                            <Form.Label>Applications</Form.Label>
                            <JoditEditor
                                value={updatedProduct.applications}
                                config={config}
                                onChange={handleEditorChange('applications')}
                                />
                        </Form.Group>



                        <Form.Group controlId="formWarranty">
                            <Form.Label>Warranty</Form.Label>
                            <Form.Control
                                type="text"
                                name="warranty"
                                value={updatedProduct.warranty}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPricePerUnit">
                            <Form.Label>Price Per Unit</Form.Label>
                            <Form.Control
                                type="text"
                                name="pricePerUnit"
                                value={updatedProduct.pricePerUnit}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formUnitName">
                            <Form.Label>Unit Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="unitName"
                                value={updatedProduct.unitName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                value={updatedProduct.quantity}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, quantity: parseInt(e.target.value) })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formProductImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleFileChange}
                            />
                        </Form.Group>
                        {updatedProduct.image && (
                            <img src={`${API_BASE_URL_IMAGE}/${updatedProduct.image}`} alt="Preview" style={{ width: '100px', height: '100px' }} />
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateProduct}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
