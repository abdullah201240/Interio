import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Navbar from './Navbar';
import Footer from './Footer';
import Categories from './Categories';
import { initiateSignup, completeSignup, signupWithGoogle } from './api/userSignupApi';
import Interior from '../assets/img/Interior-design-pana.png';
import Logo from '../assets/img/logo.png';
import Glogo from '../assets/img/google-removebg-preview.png';
import '../assets/css/UserSignup.css';

export default function UserSignup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        dob: '',
        gender: '',
        code: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isVerificationStep, setIsVerificationStep] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async () => {
        try {
            setError('');
            await initiateSignup(formData);

            setMessage('Please check your email for the verification code.');
            setIsVerificationStep(true);
        } catch (err) {
            setMessage('');
            setError('Signup failed. Please try again.');
        }
    };

    const handleVerification = async () => {
        try {
            setError('');
            await completeSignup(formData.name, formData.email, formData.password, formData.dob, formData.gender, formData.code);

            setMessage('Verification successful! Redirecting to the login page...');
            setTimeout(() => {
                navigate('/user/login');
            }, 1000);
        } catch (err) {
            setMessage('');
            setError('Verification failed. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
            <Navbar
             isLoggedIn={false}  
                
              userHomeLink="/user-home" 
            />
            </div>
            <div className="user-signup-background">
                <Categories />
                <p className="signup-text">
                    If you have an account, please <Link to='/user/login' className="highlight-text">Login</Link>
                </p>
                <div className="container user-signup-container">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="welcome-text1">
                                Create your <span className="highlight-text">Interio!</span> Account
                            </h5>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <div className="password-container">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password-visibility1"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                                <p style={{ color: 'red', fontSize: 'small' }}>
                                    Your password must be at least 6 characters long and include a combination of numbers, letters, and special characters (@#$%^).
                                </p>
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="form-control"
                                >
                                    <option value="">Please select one...</option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="non-binary">Non-Binary</option>
                                    <option value="other">Other</option>
                                    <option value="prefer-not-to-answer">Prefer not to answer</option>
                                </select>
                            </div>
                            <Button onClick={handleSignup} className="signup-button">
                                Submit
                            </Button>
                        </div>
                        <div className="col-md-6 signup-form-container">
                            <img src={Interior} alt="Interior" className="interior-image" />
                            {isVerificationStep && (
                                <>
                                    <div className="form-group">
                                        <label>Email Verification Code</label>
                                        <input
                                            type="text"
                                            name="code"
                                            value={formData.code}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="6 digits code"
                                            style={{ height: '50px' }}
                                        />
                                    </div>
                                    <Button onClick={handleVerification} className="signup-button">
                                        Verify
                                    </Button>
                                </>
                            )}
                            <p className="or-text">Or</p>
                            <button className="google-button" onClick={signupWithGoogle}>
                                <img src={Glogo} alt="Google logo" width={30} /> Sign Up with Google
                            </button>
                        </div>
                    </div>
                    <br></br>
                    {message && <div className="message-box">{message}</div>}
                    {error && <div className="error-box">{error}</div>}


                </div>
            </div>
            <Footer />
        </div>
    );
}
