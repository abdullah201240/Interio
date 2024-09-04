import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

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
    image: File | string;
    adminEmail: string;
    adminName: string;
}

interface AddToCartModalProps {
    show: boolean;
    handleClose: () => void;
    product: Product | null;
    onAdd: (quantity: number) => void;
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({ show, handleClose, product, onAdd }) => {
    const [quantity, setQuantity] = useState<number>(1);

    const handleAdd = () => {
        onAdd(quantity);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add to Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        min="1"
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAdd}>
                    Add to Cart
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddToCartModal;
