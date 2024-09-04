import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import JoditEditor from 'jodit-react';
import { addProduct } from './api/productApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { useGetCategories, useGetSubCategoriesByCategory } from './api/categoryApi';

declare global {
    interface Window {
        webkitSpeechRecognition: any;
    }
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start: () => void;
    stop: () => void;
    onstart: () => void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onend: () => void;
}

interface SpeechRecognitionEvent extends Event {
    results: {
        [key: number]: {
            [key: number]: {
                transcript: string;
            };
        };
    };
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
}

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

export default function AdminProductForm({ placeholder }: ExampleProps) {
    const [formData, setFormData] = useState({
        productName: '',
        productCode: '',
        productCategory: '',
        productSubCategory: '',
        productDescription: '',
        measurementDetails: '',
        applications: '',
        warranty: '',
        pricePerUnit: '',
        unitName: '',
        quantity: '',
        image: null as File | null,
    });

    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [selectedField, setSelectedField] = useState<string | null>(null);
    const navigate = useNavigate();
    const adminEmail = useSelector((state: RootState) => state.adminAuth.email);

    const { data: categories } = useGetCategories();
    const { data: fetchedSubCategories, refetch } = useGetSubCategoriesByCategory(formData.productCategory);

    useEffect(() => {
        if (fetchedSubCategories) {
            setSubCategories(fetchedSubCategories);
        }
    }, [fetchedSubCategories]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if (name === 'productCategory') {
            refetch();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            image: e.target.files ? e.target.files[0] : null,
        });
    };

    const handleDescriptionChange = (content: string) => {
        setFormData({
            ...formData,
            productDescription: content,
        });
    };

    const handleMeasurementChange = (content: string) => {
        setFormData({
            ...formData,
            measurementDetails: content,
        });
    };

    const handleApplicationsChange = (content: string) => {
        setFormData({
            ...formData,
            applications: content,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const data = new FormData();
        for (const [key, value] of Object.entries(formData)) {
            if (key === 'image' && value) {
                data.append(key, value);
            } else if (key !== 'image') {
                data.append(key, value || '');
            }
        }
    
        data.append('adminEmail', adminEmail || '');

        try {
            const response = await addProduct(data);
            console.log('Product added successfully:', response);
            alert("Product added successfully");
            navigate('/admin/all-products');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const config = useMemo(() => ({
        readonly: false,
        placeholder: placeholder || 'Start typing...'
    }), [placeholder]);

    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new window.webkitSpeechRecognition() as SpeechRecognition;
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                console.log('Speech recognition started');
            };

            recognition.onresult = (event: SpeechRecognitionEvent) => {
                const transcript = event.results[0][0].transcript;
                if (selectedField) {
                    setFormData((prevData) => ({
                        ...prevData,
                        [selectedField]: transcript,
                    }));
                }
            };

            recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
                console.error('Speech recognition error', event.error);
            };

            recognition.onend = () => {
                console.log('Speech recognition ended');
            };

            recognitionRef.current = recognition;
        }
    }, [selectedField]);

    const startRecognition = () => {
        if (recognitionRef.current) {
            recognitionRef.current.start();
        }
    };

    const stopRecognition = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    const handleFieldSelect = (field: string) => {
        setSelectedField(field);
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={12}>
                    <Form className="shadow p-4 rounded" onSubmit={handleSubmit}>
                        <h3 className="text-center mb-4">Add New Product</h3>

                        <Button onClick={startRecognition}>Start Speech Recognition</Button>
                        <Button onClick={stopRecognition} variant="danger" className="ms-2">Stop Speech Recognition</Button>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="productName">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter product name"
                                        name="productName"
                                        value={formData.productName}
                                        onChange={handleChange}
                                        onClick={() => handleFieldSelect('productName')}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="productCode">
                                    <Form.Label>Product Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter product code"
                                        name="productCode"
                                        value={formData.productCode}
                                        onChange={handleChange}
                                        onClick={() => handleFieldSelect('productCode')}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="productCategory">
                                    <Form.Label>Product Category</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="productCategory"
                                        value={formData.productCategory}
                                        onChange={handleChange}
                                        onClick={() => handleFieldSelect('productCategory')}
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
                                <Form.Group className="mb-3" controlId="productSubCategory">
                                    <Form.Label>Product Sub-Category</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="productSubCategory"
                                        value={formData.productSubCategory}
                                        onChange={handleChange}
                                        onClick={() => handleFieldSelect('productSubCategory')}
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
                                <Form.Group className="mb-3" controlId="productDescription">
                                    <Form.Label>Product Description</Form.Label>
                                    <JoditEditor
                                        value={formData.productDescription}
                                        config={config}
                                        onBlur={handleDescriptionChange}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="measurementDetails">
                                    <Form.Label>Measurement Details</Form.Label>
                                    <JoditEditor
                                        value={formData.measurementDetails}
                                        config={config}
                                        onBlur={handleMeasurementChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="applications">
                                    <Form.Label>Applications</Form.Label>
                                    <JoditEditor
                                        value={formData.applications}
                                        config={config}
                                        onBlur={handleApplicationsChange}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="warranty">
                                    <Form.Label>Warranty</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter warranty details"
                                        name="warranty"
                                        value={formData.warranty}
                                        onChange={handleChange}
                                        onClick={() => handleFieldSelect('warranty')}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="pricePerUnit">
                                    <Form.Label>Price Per Unit</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter price per unit"
                                        name="pricePerUnit"
                                        value={formData.pricePerUnit}
                                        onChange={handleChange}
                                        onClick={() => handleFieldSelect('pricePerUnit')}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="unitName">
                                    <Form.Label>Unit Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter unit name"
                                        name="unitName"
                                        value={formData.unitName}
                                        onChange={handleChange}
                                        onClick={() => handleFieldSelect('unitName')}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="quantity">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter quantity"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        onClick={() => handleFieldSelect('quantity')}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="image">
                                    <Form.Label>Product Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={handleFileChange}
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
