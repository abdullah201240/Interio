import React, { useEffect } from 'react';
import '../assets/css/AdminHome.css';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import AdminFooter from './AdminFooter';
import AdminStatus from './OrderStatusCard';
import SalesChart from './SalesChart';
import AlertTable from './AlertTable';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { useNavigate } from 'react-router-dom';

export default function AdminHome() {
  const adminEmail = useSelector((state: RootState) => state.adminAuth.email);
  const navigate = useNavigate();
  useEffect(() => {
    if (!adminEmail) {
      navigate('/admin/login');
    }
  }, [adminEmail, navigate]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column',  background: 'rgb(243, 242, 247)' }}>
      <div style={{ background: 'white', borderBottom: '1px solid #e0e0e0', position: 'sticky', top: 0, zIndex: 1000,marginLeft:'16.5%' }}>
        <AdminNavbar />
        
      </div>
      <br></br>
       
      <div style={{ display: 'flex', flex: 1, overflowY: 'auto', flexDirection: 'row' }}>
        {/* Sidebar */}
        <div className="sidebar">
          <Sidebar />
        </div>
        
        {/* Main content area */}
        <div className="content-section">
        
          <h6>Dashboard</h6>
          
          
          <AdminStatus />
          <SalesChart />
          <AlertTable />
        </div>
      </div>
      <br></br>
      <br></br>


      {/* Footer */}
      <AdminFooter />
    </div>
  );
}
