import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


interface OrderModalProps {
    show: boolean;
    handleClose: () => void;
    onSubmit: (orderData: any) => void;
}

const AdminOrderModal: React.FC<OrderModalProps> = ({ show, handleClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [house, setHouse] = useState('');

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const paymentData = {
            cus_name: name,
            cus_email: email,
            cus_phone: phone,
            city,
            house,
        };
        try {
            // Call the parent onSubmit function
            await onSubmit(paymentData);
            handleClose(); // Close the modal on successful submission
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            as="select"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        >
                            <option value="">Select District</option>
                            <option value="Bandar">Bandar</option>
                            <option value="Bandarban">Bandarban</option>
                            <option value="Barisal">Barisal</option>
                            <option value="Bhola">Bhola</option>
                            <option value="Brahmanbaria">Brahmanbaria</option>
                            <option value="Chandpur">Chandpur</option>
                            <option value="Chattogram">Chattogram</option>
                            <option value="Chuadanga">Chuadanga</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Dinajpur">Dinajpur</option>
                            <option value="Faridpur">Faridpur</option>
                            <option value="Feni">Feni</option>
                            <option value="Gaibandha">Gaibandha</option>
                            <option value="Gazipur">Gazipur</option>
                            <option value="Gopalganj">Gopalganj</option>
                            <option value="Habiganj">Habiganj</option>
                            <option value="Jamalpur">Jamalpur</option>
                            <option value="Jashore">Jashore</option>
                            <option value="Jatiyo">Jatiyo</option>
                            <option value="Jhalokati">Jhalokati</option>
                            <option value="Jhinaidah">Jhinaidah</option>
                            <option value="Joypurhat">Joypurhat</option>
                            <option value="Khagrachari">Khagrachari</option>
                            <option value="Khulna">Khulna</option>
                            <option value="Kishoreganj">Kishoreganj</option>
                            <option value="Kotchandpur">Kotchandpur</option>
                            <option value="Lalmonirhat">Lalmonirhat</option>
                            <option value="Madaripur">Madaripur</option>
                            <option value="Magura">Magura</option>
                            <option value="Manikganj">Manikganj</option>
                            <option value="Meherpur">Meherpur</option>
                            <option value="Moulvibazar">Moulvibazar</option>
                            <option value="Mymensingh">Mymensingh</option>
                            <option value="Naogaon">Naogaon</option>
                            <option value="Narail">Narail</option>
                            <option value="Narsingdi">Narsingdi</option>
                            <option value="Natore">Natore</option>
                            <option value="Netrokona">Netrokona</option>
                            <option value="Nilphamari">Nilphamari</option>
                            <option value="Noakhali">Noakhali</option>
                            <option value="Panchagarh">Panchagarh</option>
                            <option value="Patuakhali">Patuakhali</option>
                            <option value="Pirojpur">Pirojpur</option>
                            <option value="Rajbari">Rajbari</option>
                            <option value="Rajshahi">Rajshahi</option>
                            <option value="Rangamati">Rangamati</option>
                            <option value="Rangpur">Rangpur</option>
                            <option value="Satkhira">Satkhira</option>
                            <option value="Shariatpur">Shariatpur</option>
                            <option value="Sherpur">Sherpur</option>
                            <option value="Sirajganj">Sirajganj</option>
                            <option value="Sunamganj">Sunamganj</option>
                            <option value="Sylhet">Sylhet</option>
                            <option value="Tangail">Tangail</option>
                            <option value="Thakurgaon">Thakurgaon</option>


                        </Form.Control>

                    </Form.Group>


                    <Form.Group controlId="formHouse">
                        <Form.Label>Full Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your Full House Address"
                            value={house}
                            onChange={(e) => setHouse(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Done
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AdminOrderModal;
