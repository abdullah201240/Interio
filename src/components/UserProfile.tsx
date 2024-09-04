import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { API_BASE_URL, API_BASE_URL_IMAGE } from '../config';
import { clearAuth } from './redux/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from './hooks/useLogin';
import axios from 'axios';
import Categories from './Categories';
import defaultImg from '../assets/img/9187604.png';
import '../assets/css/UserProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email } = useAppSelector((state) => state.auth);

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    house: '',
    image: '',
    gender: '',
    dob: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({ ...profile });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/profile/${email}`);
        setProfile(response.data);
        setUpdatedProfile(response.data);

      } catch (error) {
      }
    };

    fetchProfile();
  }, [email]);


  const handleCustomLogout = async () => {
    try {
      await axios.get(`${API_BASE_URL}/user/logout`);
      dispatch(clearAuth());
      navigate('/user/login');
    } catch (error) {
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('name', updatedProfile.name ?? '');
      formData.append('phone', updatedProfile.phone ?? '');
      formData.append('city', updatedProfile.city ?? ''); // Updated from address to city
      formData.append('house', updatedProfile.house ?? ''); // Added house
      formData.append('dob', updatedProfile.dob ?? ''); // Added house
      formData.append('gender', updatedProfile.gender ?? ''); // Added house
      if (file) {
        formData.append('image', file);
      }

      await axios.put(`${API_BASE_URL}/user/updateprofile/${email}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProfile(updatedProfile);
      setModalVisible(false);
    } catch (error) {
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Navbar
          isLoggedIn={!!email}
          userHomeLink="/user-home"
          onLogout={handleCustomLogout}
        />
      </div>
      <div className="profile-container">
        <Categories />

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
              <label htmlFor="city">City</label>
              <textarea id="city" className="form-control" value={profile.city} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="house">House</label>
              <textarea id="house" className="form-control" value={profile.house} disabled />
            </div>
            <br />
            <button type="button" className="btn btn-success" onClick={() => setModalVisible(true)}>
              Edit
            </button>
          </div>
        </div>

        <div
          className={`modal fade ${modalVisible ? 'show' : ''}`}
          style={{ display: modalVisible ? 'block' : 'none' }}
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button type="button" className="close" onClick={() => setModalVisible(false)} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="modalName">Name</label>
                  <input
                    type="text"
                    id="modalName"
                    className="form-control"
                    value={updatedProfile.name}
                    onChange={(e) => setUpdatedProfile({ ...updatedProfile, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="modalPhone">Phone</label>
                  <input
                    type="text"
                    id="modalPhone"
                    className="form-control"
                    value={updatedProfile.phone}
                    onChange={(e) => setUpdatedProfile({ ...updatedProfile, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="modalCity">City</label>
                  <textarea
                    id="modalCity"
                    className="form-control"
                    value={updatedProfile.city}
                    onChange={(e) => setUpdatedProfile({ ...updatedProfile, city: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="modalDob">Date Of Birth</label>
                  <input
                    type='date'
                    id="modalDob"
                    className="form-control"
                    value={updatedProfile.dob}
                    onChange={(e) => setUpdatedProfile({ ...updatedProfile, dob: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="modalGender">Gender</label>
                  <select
                    id="modalGender"
                    name="gender"
                    className="form-control"
                    value={updatedProfile.gender}
                    onChange={(e) => setUpdatedProfile({ ...updatedProfile, gender: e.target.value })}
                  >
                    <option value="">Please select one…</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="non-binary">Non-Binary</option>
                    <option value="other">Other</option>
                    <option value="prefer not to answer">Prefer not to answer</option>
                  </select>
                </div>

                <div className="form-group">


                  <label htmlFor="modalHouse">House</label>
                  <textarea
                    id="modalHouse"
                    className="form-control"
                    value={updatedProfile.house}
                    onChange={(e) => setUpdatedProfile({ ...updatedProfile, house: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="modalImage">Profile Image</label>
                  <input
                    type="file"
                    id="modalImage"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setModalVisible(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleUpdateProfile}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
