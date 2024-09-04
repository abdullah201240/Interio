import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import AdminFooter from './AdminFooter';
import '../assets/css/AdminCreateSubAdmin.css'; // Import CSS file for styling
import { createAdmin } from './api/adminCreateSubAdmin'; // Import the API function
import { useNavigate } from 'react-router-dom';

export default function AdminCreateSubAdmin() {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone:'',
    dob: '',
    gender: '',
    role: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
       await createAdmin(formData);
      alert('Admin created successfully');
      navigate('/admin/adminlist');
      // Optionally, redirect or reset form here
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unexpected error occurred');
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: 'rgb(243, 242, 247)' }}>
      <div style={{ background: 'white', borderBottom: '1px solid #e0e0e0', position: 'sticky', top: 0, zIndex: 1000, marginLeft: '16.5%' }}>
        <AdminNavbar />
      </div>
      <div style={{ display: 'flex', flex: 1, overflowY: 'auto', padding: '20px', gap: '20px' }}>
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content-section" style={{background:'rgb(243, 242, 247)'}}>
          <form className="create-subadmin-form" onSubmit={handleSubmit}>
            <h3 style={{textAlign:'center'}}>Create Sub Admin</h3>
            <div className="form-group2">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group2">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group2">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} />
            </div>
            <div className="form-group2">
              <label htmlFor="name">Phone</label>
              <input type="text" id="phone" name="phone" placeholder="Enter phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-group2">
              <label htmlFor="dob">Date of Birth</label>
              <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
            </div>
            <div className="form-group2">
              <label htmlFor="gender">Gender</label>
              <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group2">
              <label htmlFor="role">Role</label>
              <select id="role" name="role" value={formData.role} onChange={handleChange}>
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="subadmin">Sub Admin</option>
              </select>
            </div>
            <button type="submit">Create Sub Admin</button>
          </form>
        </div>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <AdminFooter />
      </div>
    </div>
  );
}
