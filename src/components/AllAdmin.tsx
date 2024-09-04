import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';
import AdminFooter from './AdminFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import "../assets/css/AllProducts.css";
import { getAllAdmins, updateAdmin, deleteAdmin } from './api/viewAllAdminApi'; // Import the delete API call
import '../assets/css/Model.css';

export default function AllAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingAdmin, setEditingAdmin] = useState<any | null>(null);
  const [deletingAdmin, setDeletingAdmin] = useState<any | null>(null); // State for the admin to be deleted

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const data = await getAllAdmins();
        setAdmins(data);
      } catch (error) {
        setError('Failed to fetch admins.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter data based on the search term
  const filteredData = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm) 
    
  );

  const handleEditClick = (admin: any) => {
    setEditingAdmin(admin);
  };

  const handleUpdate = async () => {
    if (!editingAdmin) return;

    try {
      await updateAdmin(editingAdmin.id, editingAdmin);
      const updatedAdmins = admins.map(admin =>
        admin.id === editingAdmin.id ? editingAdmin : admin
      );
      setAdmins(updatedAdmins);
      setEditingAdmin(null);
    } catch (error) {
      setError('Failed to update admin.');
    }
  };

  const handleDeleteClick = (admin: any) => {
    setDeletingAdmin(admin); // Show the delete confirmation modal
  };

  const handleConfirmDelete = async () => {
    if (!deletingAdmin) return;

    try {
      await deleteAdmin(deletingAdmin.id);
      setAdmins(admins.filter(admin => admin.id !== deletingAdmin.id));
      setDeletingAdmin(null); // Close the confirmation modal
    } catch (error) {
      setError('Failed to delete admin.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingAdmin((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (

    <div style={{ display: 'flex', flexDirection: 'column',  background: 'rgb(243, 242, 247)' }}>
      <div style={{ background: 'white', borderBottom: '1px solid #e0e0e0', position: 'sticky', top: 0, zIndex: 1000,marginLeft:'16.5%' }}>
        <AdminNavbar />
        </div>
      <br></br>

      <div style={{ display: 'flex', flex: 1, overflowY: 'auto', flexDirection: 'row' }}>
      <div className="sidebar">
          <Sidebar />
          </div>

        <div className="content-section">
          <div className="header">
            <h2 style={{ color: 'orange' }}>All Admin</h2>
          </div>

          <div className="search-container">
            <input
              type="search"
              id="gsearch"
              name="gsearch"
              placeholder="Search admins by name..."
              className="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Edit</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Date of Birth</th>
                    <th>Gender</th>
                    <th>Role</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((admin) => (
                    <tr key={admin.id}>
                      <td>
                        <button className="edit-button" onClick={() => handleEditClick(admin)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </td>
                      <td>{admin.name}</td>
                      <td>{admin.email}</td>
                      <td>{admin.phone}</td>
                      <td>{admin.dob}</td>
                      <td>{admin.gender}</td>
                      <td>{admin.role}</td>
                      <td>
                        <button className="edit-button1" onClick={() => handleDeleteClick(admin)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Edit Admin Modal */}
              {editingAdmin && (
                <div className="edit-modal">
                  <h3>Edit Admin</h3>
                  <label>
                    Name:
                    <input type="text" name="name" value={editingAdmin.name} onChange={handleInputChange} />
                  </label>
                  <label>
                    Phone:
                    <input type="text" name="phone" value={editingAdmin.phone} onChange={handleInputChange} />
                  </label>
                  <label>
                    Date of Birth:
                    <input type="date" name="dob" value={editingAdmin.dob} onChange={handleInputChange} />
                  </label>
                  <label>
                    Gender:
                    <input type="text" name="gender" value={editingAdmin.gender} onChange={handleInputChange} />
                  </label>
                  <label>
                    Role:
                    <input type="text" name="role" value={editingAdmin.role} onChange={handleInputChange} />
                  </label>
                  <button onClick={handleUpdate}>Update</button>
                  <button onClick={() => setEditingAdmin(null)}>Cancel</button>
                </div>
              )}

              {/* Delete Confirmation Modal */}
              {deletingAdmin && (
                <div className="delete-modal">
                  <p>Are you sure you want to delete {deletingAdmin.name}?</p>
                  <button onClick={handleConfirmDelete}>Yes, Delete</button>
                  <button onClick={() => setDeletingAdmin(null)}>Cancel</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <footer>
        <AdminFooter />
      </footer>
    </div>
  );
}
