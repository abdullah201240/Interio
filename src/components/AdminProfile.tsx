import React, { useEffect, useState } from 'react'
import { API_BASE_URL, API_BASE_URL_IMAGE } from '../config';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';
import defaultImg from '../assets/img/9187604.png';

export default function AdminProfile() {
  const adminEmail = useSelector((state: RootState) => state.adminAuth.email);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    role: '', 
    image: '',
    gender: '',
    dob: '',
  });
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/admin/Profile/${adminEmail}`);
        setProfile(response.data.admin);

      } catch (error) {
      }
    };

    fetchProfile();
  }, [adminEmail]);
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', background: 'rgb(243, 242, 247)' }}>
        <div style={{
          background: 'white',
          borderBottom: '1px solid #e0e0e0',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          marginLeft: '16.5%',
        }}>
          <AdminNavbar />
        </div>
        <div style={{ display: 'flex', flex: 1, overflowY: 'auto', padding: '20px', gap: '20px' }}>
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="profile-card">
          <div className="profile-image-container">
            <img
              src={
                profile.image && profile.image.startsWith('https://lh3.googleusercontent.com')
                  ? profile.image
                  : profile.image
                    ? `${API_BASE_URL_IMAGE}/upload/${profile.image}`
                    : defaultImg
              }
              alt={profile.image ? 'Profile image' : 'Default profile image'}
              className="profile-image"
            />


          </div>
          <div className="profile-details">
            <h2 className="profile-title">My Profile</h2>
            <br />
            <br />
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" className="form-control" value={profile.name} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" className="form-control" value={profile.email} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="text" id="phone" className="form-control" value={profile.phone} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date Of Birth</label>
              <input type="text" id="dob" className="form-control" value={profile.dob || ''} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <input type="text" id="gender" className="form-control" value={profile.gender || ''} disabled />
            </div>


            <div className="form-group">
              <label htmlFor="city">Role</label>
              <textarea id="city" className="form-control" value={profile.role} disabled />
            </div>
            
            <br />
            
          </div>
        </div>



        </div>
      </div>



    </div>
  )
}
