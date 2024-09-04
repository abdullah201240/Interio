import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from './redux/store';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';
import AdminProductForm from './AdminProductFrom';
import AdminFooter from './AdminFooter';

export default function AddProducts() {
    const navigate = useNavigate();
    const adminEmail = useSelector((state: RootState) => state.adminAuth.email);

    useEffect(() => {
        if (!adminEmail) {
          navigate('/admin/login');
        }
      }, [adminEmail, navigate]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: 'rgb(243, 242, 247)' }}>
              <div
        style={{
          background: 'white',
          borderBottom: '1px solid #e0e0e0',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          marginLeft: '16.5%',
        }}
      >

<AdminNavbar />

      </div>
      <div>
        
        <div className="sidebar">
          <Sidebar />
        </div>

        <div className="content-section">
        <AdminProductForm/>


        </div>



        </div>
        <footer>
        <AdminFooter />
      </footer>

      
    </div>
  )
}







