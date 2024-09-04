import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Logo from '../assets/img/logo.png';
import Categories from './Categories';
import Interior from '../assets/img/Interior-design-pana.png';
import '../assets/css/UserLogin.css';
import Glogo from '../assets/img/google-removebg-preview.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { setAuth } from './redux/authSlice';
import { loginUser } from './api/authApi';
import { useAppDispatch } from './hooks/useLogin';
import { API_BASE_URL } from '../config';
import { useMutation } from '@tanstack/react-query';
import { Modal, Button, Form } from 'react-bootstrap';
import {  sendResetCode, verifyResetCode, resetPassword } from './api/forgetPassword';

interface ApiError extends Error {
    response?: {
        data?: {
            error?: string;
        };
    };
}

export default function UserLogin() {
    const [email, setEmail] = useState('');
    const [vemail, setVEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [currentModal, setCurrentModal] = useState(0); // 0: No modal, 1: Email, 2: Code, 3: Reset Password

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();

    const handleForgotPasswordClick = () => {
        setCurrentModal(1); // Show the first modal for entering the email
    };

    const handlePasswordResetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await sendResetCode(vemail);
            setCurrentModal(2); // Move to the verification code modal
        } catch (error) {
            setErrorMessage('Failed to send reset link. Please try again.');
        }
    };


    const handleCodeVerificationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await verifyResetCode(vemail, verificationCode);
            setCurrentModal(3); // Move to the reset password modal
        } catch (error) {
            setErrorMessage('Invalid verification code. Please try again.');
        }
    };

    const handleNewPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword === confirmPassword) {
            try {
                await resetPassword(vemail, newPassword);
                alert("Password has been reset successfully!");
                setCurrentModal(0); // Close all modals after successful reset
            } catch (error) {
                setErrorMessage('Failed to reset password. Please try again.');
            }
        } else {
            alert("Passwords do not match!");
        }
    };


    const closeModal = () => setCurrentModal(0);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const loginWithGoogle = () => {
        window.location.href = `${API_BASE_URL}/user/auth/google`;
    };

    const handleGoogleCallback = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/login/success`, {
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(setAuth({
                    token: data.token,
                    email: data.user.email,
                    name: data.user.name,
                }));
                navigate('/user-home');
            } else {
                setErrorMessage('Failed to authenticate with Google.');
            }
        } catch (error) {
            setErrorMessage('An error occurred during Google login. Please try again.');
        }
    };

    useEffect(() => {
        if (location.search.includes('google')) {
            handleGoogleCallback();
        }
    }, [location]);

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            dispatch(setAuth({
                token: data.token,
                email: data.email,
                name: data.name,
            }));
            navigate('/user-home');
        },
        onError: (error: ApiError) => {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.error || 'Information Not Found');
            } else {
                setErrorMessage('Information Not Found');
            }
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');
        loginMutation.mutate({ email, password });
    };

    return (
        <div className="user-login-wrapper">
            <Navbar
             isLoggedIn={false}  
                
              userHomeLink="/user-home" 
            />
            <div className="user-login-background">
                <Categories />
                <p className="login-text">
                    If you have no account, please <Link to='/user/register' className="highlight-text">SIGN UP</Link>
                </p>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 text-center">
                            <img src={Interior} alt="Interior" className="interior-image1" />
                        </div>
                        <div className="col-md-6 login-form-container user-login-container">
                            <br></br>
                            <h5 className="welcome-text">
                                Welcome to <span className="highlight-text">Interio!</span> Please Login
                            </h5>
                            <form className="login-form" onSubmit={handleSubmit}>
                                <div className="form-group1">
                                    <label htmlFor="email">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        className="form-control" 
                                        placeholder="Enter your email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="form-group1">
                                    <label htmlFor="password">Password</label>
                                    <div className="password-container">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="toggle-password-visibility"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                    
                                    <a  onClick={handleForgotPasswordClick}  className="forgot-password5">
                                        Forgot Password?
                                    </a>
                                </div>
                                <div className='login'>
                                    <Button type="submit" className="login-button">LOGIN</Button>
                                </div>
                                <p className="or-text">Or</p>
                                <div className='login5'>
                                    <button type="button" className="google-button" onClick={loginWithGoogle}>
                                        <img src={Glogo} alt='Google logo' width={30} /> Sign in with Google
                                    </button>
                                    <br />
                                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                                </div>
                                <br />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            {/* Modal 1: Enter Email */}
            <Modal show={currentModal === 1} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Forgot Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handlePasswordResetSubmit}>
                        <Form.Group controlId="resetEmail">
                            <Form.Label>Enter your registered email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={vemail}
                                onChange={(e) => setVEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br></br>
                        <Button variant="primary" type="submit">
                            Send Reset Link
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal 2: Enter Verification Code */}
            <Modal show={currentModal === 2} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Verification Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCodeVerificationSubmit}>
                        <Form.Group controlId="verificationCode">
                            <Form.Label>Enter the code sent to your email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter verification code"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br></br>
                        <Button variant="primary" type="submit">
                            Verify Code
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal 3: Reset Password */}
            <Modal show={currentModal === 3} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleNewPasswordSubmit}>
                        <Form.Group controlId="newPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br></br>
                        <Button variant="primary" type="submit">
                            Reset Password
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
