import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/css/AdminNavbar.css';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { getAdminByEmail } from './api/adminByEmailApi'; // Import the API function

function AdminNavbar() {
  const adminEmail = useSelector((state: RootState) => state.adminAuth.email);
  const [adminRole, setAdminRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdminRole = async () => {
      try {
        if (adminEmail) {
          const adminData = await getAdminByEmail(adminEmail);
          setAdminRole(adminData.role);
        }
      } catch (error) {
        console.error('Error fetching admin role:', error);
      }
    };

    fetchAdminRole();
  }, [adminEmail]);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <ul className="navbar-nav">
            {adminRole === 'admin' && (
              <><li className="nav-item">
                <Link className="btn btn-orange" to="/admin/subadmin">
                  Create Sub Admin
                </Link>
              </li><li className="nav-item">
                  <Link className="btn btn-orange" to="/admin/adminlist">
                    All Admin
                  </Link>
                </li></>
            )}
            <li className="nav-item active ml-3">
              <Link to='/admin/profile'>

              <FontAwesomeIcon icon={faCircleUser} className="user-icon" />
              </Link>
              
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
