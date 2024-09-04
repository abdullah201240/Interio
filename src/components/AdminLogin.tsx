import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/AdminLogin.css';
import Logo from '../assets/img/logo.png';
import { loginAdmin} from './api/adminAuthApi';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from './hooks/adminLogin';
import { setAdminAuth } from './redux/adminAuthSlice';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { sendResetCode, verifyResetCode, resetPassword } from './api/adminForgetPassword'

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vemail, setVEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentModal, setCurrentModal] = useState(0); // 0: No modal, 1: Email, 2: Code, 3: Reset Password

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginMutation = useMutation({
    mutationFn: loginAdmin,
    onSuccess: (data) => {
      dispatch(setAdminAuth({ token: data.token, email: data.email }));
      navigate('/admin-home');
    },
    onError: (error: any) => {
      setError(error.response?.data?.error || 'An error occurred');
      console.error('Login failed:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear previous error messages
    loginMutation.mutate({ email, password });
  };

  const handleForgotPasswordClick = () => {
    setCurrentModal(1); // Show the first modal for entering the email
  };

  const handlePasswordResetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendResetCode(vemail);
      setCurrentModal(2); // Move to the verification code modal
    } catch (error) {
      setError('Failed to send reset link. Please try again.');
    }
  };

  const handleCodeVerificationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await verifyResetCode(vemail, verificationCode);
      setCurrentModal(3); // Move to the reset password modal
    } catch (error) {
      setError('Invalid verification code. Please try again.');
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
        setError('Failed to reset password. Please try again.');
      }
    } else {
      alert("Passwords do not match!");
    }
  };

  const closeModal = () => setCurrentModal(0);

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src={Logo} height={47} width={270} alt="Interio Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-label">
            <label>Email</label>
          </div>
          <div className="input-group">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
            <input
              type="email"
              placeholder="Please enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-label1">
            <label>Password</label>
          </div>
          <div className="input-group">
            <FontAwesomeIcon icon={faLock} className="icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password-visibility2"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <h4
            className="forgot-password3"
            style={{ color: 'orange', cursor: 'pointer' }}
            onClick={handleForgotPasswordClick}
          >
            Forgot Password?
          </h4>
          <br />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className="bt" type="submit">
            LOGIN
          </button>
        </form>
      </div>

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
            <br />
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
            <br />
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
            <br />
            <Button variant="primary" type="submit">
              Reset Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
