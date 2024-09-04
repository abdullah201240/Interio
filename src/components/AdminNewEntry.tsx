import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { useGetCategories, useGetSubCategoriesByCategory } from './api/categoryApi';
import { API_BASE_URL } from '../config';

export interface Category {
    id: string;
    name: string;
}

export interface SubCategory {
    id: string;
    name: string;
}

export interface Product {
    id: string;
    productName: string;
}

export default function AdminNewEntry() {
    const [formData, setFormData] = useState({
        productName: '',
        productCategory: '',
        productSubCategory: '',
        productEntry: '',
        productId: '',
    });

    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();
    const adminEmail = useSelector((state: RootState) => state.adminAuth.email);

    const { data: categories } = useGetCategories();
    const { data: fetchedSubCategories, refetch } = useGetSubCategoriesByCategory(formData.productCategory);

    useEffect(() => {
        if (fetchedSubCategories) {
            setSubCategories(fetchedSubCategories);
        }
    }, [fetchedSubCategories]);

    useEffect(() => {
        if (formData.productCategory) {
            const fetchProducts = async () => {
                try {
                    const response = await fetch(`${API_BASE_URL}/admin/findProduct?categoryId=${formData.productCategory}&subcategoryId=${formData.productSubCategory}`);
                    if (response.ok) {
                        const data = await response.json();
                        setProducts(data);
                    } else {
                        console.error('Failed to fetch products');
                    }
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            };
            fetchProducts();
        }
    }, [formData.productCategory, formData.productSubCategory]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value || '', // Ensure the value is not null
        }));
        if (name === 'productCategory') {
            setFormData((prevData) => ({
                ...prevData,
                productSubCategory: '',
                productId: '', // Reset productId here
            }));
            refetch();
        } else if (name === 'productSubCategory') {
            setFormData((prevData) => ({
                ...prevData,
                productId: '', // Reset productId here
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        // Validate form data
        if (!formData.productId || !formData.productEntry) {
            console.error('Product ID and Entry Number are required');
            return;
        }
    
        try {
            const response = await fetch(`${API_BASE_URL}/admin/addNewEntry/${formData.productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity: Number(formData.productEntry) }),
            });
    
            if (response.ok) {
                navigate('/admin/all-products'); // Redirect to a success page or similar
            } else {
                console.error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={12}>
                    <Form className="shadow p-4 rounded" onSubmit={handleSubmit}>
                        <h3 className="text-center mb-4">Add New Entry</h3>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-4" controlId="productCategory">
                                    <Form.Label>Product Category</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="productCategory"
                                        value={formData.productCategory}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Category</option>
                                        {categories?.map((category: Category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-4" controlId="productSubCategory">
                                    <Form.Label>Product Sub-Category</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="productSubCategory"
                                        value={formData.productSubCategory}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Sub-Category</option>
                                        {subCategories.map((subCategory: SubCategory) => (
                                            <option key={subCategory.id} value={subCategory.id}>
                                                {subCategory.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-4" controlId="productId">
                                    <Form.Label>Product</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="productId"
                                        value={formData.productId || ''} // Ensure default is empty string
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Product</option>
                                        {products.map((product: Product) => (
                                            <option key={product.id} value={product.id}>
                                                {product.productName}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="productEntry">
                                    <Form.Label>Add New Number</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter New Number"
                                        name="productEntry"
                                        value={formData.productEntry}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button variant="primary" type="submit">
                            Add Product
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
