import React, { useEffect, useRef, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';
import AdminFooter from './AdminFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  useGetCategories,
  useGetSubCategories,
  useCreateCategory,
  useCreateSubCategory,
  useDeleteCategory,
  useDeleteSubCategory,
} from './api/categoryApi'; // Import your API hooks here
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL_IMAGE } from '../config';
import { useQueryClient } from '@tanstack/react-query'; // Import useQueryClient
import EditCategorySubcategoryModal from './EditCategorySubcategoryModal';

export default function AdminCategories() {
  const adminEmail = useSelector((state: RootState) => state.adminAuth.email);
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Initialize useQueryClient for cache management
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isEditingCategory, setIsEditingCategory] = useState(true);
  
  useEffect(() => {
    if (!adminEmail) {
      navigate('/admin/login');
    }
  }, [adminEmail, navigate]);

  const { data: categories, isLoading: categoriesLoading } = useGetCategories();
  const { data: subcategories, isLoading: subcategoriesLoading } = useGetSubCategories();

  const [categoryName, setCategoryName] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [subcategoryImage, setSubcategoryImage] = useState<File | null>(null);

  const categoryImageRef = useRef<HTMLInputElement>(null);
  const subcategoryImageRef = useRef<HTMLInputElement>(null);
  
  const createCategoryMutation = useCreateCategory({
    onSuccess: () => {
      alert('Category created successfully.');
      setCategoryName('');
            setCategoryImage(null);
            if (categoryImageRef.current) {
                categoryImageRef.current.value = '';
            }
            queryClient.invalidateQueries({
                queryKey: ['categories'],
              });
      
    },
    onError: () => {
      alert('Failed to create category. Please try again.');
    },
  });

  const createSubCategoryMutation = useCreateSubCategory({
    onSuccess: () => {
      // Clear input fields
    
      alert('Sub-category created successfully.');
      setSubcategoryName('');
            setSubcategoryImage(null);
            if (subcategoryImageRef.current) {
                subcategoryImageRef.current.value = '';
            }
            queryClient.invalidateQueries({
                queryKey: ['subcategories'],
              });
    },
    onError: () => {
      alert('Failed to create sub-category. Please try again.');
    },
  });

  const deleteCategoryMutation = useDeleteCategory({
    onSuccess: () => {
      alert('Category deleted successfully.');
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
      queryClient.invalidateQueries({
        queryKey: ['subcategories'],
      });
      
    },
    onError: () => {
      alert('Failed to delete category. Please try again.');
    },
  });

  const deleteSubCategoryMutation = useDeleteSubCategory({
    onSuccess: () => {
      alert('Sub-category deleted successfully.');
      queryClient.invalidateQueries({
        queryKey: ['subcategories'],
      });
    },
    onError: () => {
      alert('Failed to delete sub-category. Please try again.');
    },
  });

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', categoryName);
    formData.append('email', adminEmail || '');
    if (categoryImage) {
      formData.append('image', categoryImage);
    }

    createCategoryMutation.mutate(formData);
  };

  const handleSubcategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', subcategoryName);
    formData.append('cid', selectedCategory);
    formData.append('email', adminEmail || '');
    if (subcategoryImage) {
      formData.append('image', subcategoryImage);
    }

    createSubCategoryMutation.mutate(formData);
  };

  const handleDeleteCategory = (id: number) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategoryMutation.mutate(id);
      

    }
  };

  const handleDeleteSubCategory = (id: number) => {
    if (window.confirm('Are you sure you want to delete this sub-category?')) {
      deleteSubCategoryMutation.mutate(id);
    }
  };
  const openEditModal = (item: any, isCategory: boolean) => {
    setEditingItem(item);
    setIsEditingCategory(isCategory);
    setShowModal(true);
  };


  if (categoriesLoading || subcategoriesLoading) return <p>Loading...</p>;

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
      <div style={{ display: 'flex', flex: 1, overflowY: 'auto', padding: '20px', gap: '20px' }}>
        {/* Sidebar */}
        <div className="sidebar">
          <Sidebar />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
            gap: '20px',
            marginLeft: '16%',
          }}
        >
          {/* Categories Form */}
          <div
            style={{
              flex: 1,
              background: 'rgb(236, 247, 255)',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3 style={{ marginBottom: '20px', color: '#333' }}>Categories</h3>
            <form onSubmit={handleCategorySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="name" style={{ marginBottom: '5px', fontWeight: '500' }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Enter name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  style={{
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    outline: 'none',
                  }}
                />
                <label htmlFor="image" style={{ marginBottom: '5px', fontWeight: '500' }}>
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={(e) => setCategoryImage(e.target.files?.[0] || null)}
                  style={{
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    outline: 'none',
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: '10px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Add
              </button>
            </form>
          </div>

          {/* Subcategories Form */}
          <div
            style={{
              flex: 1,
              background: 'rgb(236, 247, 255)',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3 style={{ marginBottom: '20px', color: '#333' }}>Sub-Categories</h3>
            <form onSubmit={handleSubcategorySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="category" style={{ marginBottom: '5px', fontWeight: '500' }}>
                  Categories
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    outline: 'none',
                  }}
                >
                  <option value="">Select category</option>
                  {categories?.map((category:any) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="subcategory" style={{ marginBottom: '5px', fontWeight: '500' }}>
                  Name
                </label>
                <input
                  type="text"
                  id="subcategory"
                  name="subcategory"
                  required
                  placeholder="Enter name"
                  value={subcategoryName}
                  onChange={(e) => setSubcategoryName(e.target.value)}
                  style={{
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    outline: 'none',
                  }}
                />
                <label htmlFor="image" style={{ marginBottom: '5px', fontWeight: '500' }}>
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={(e) => setSubcategoryImage(e.target.files?.[0] || null)}
                  style={{
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    outline: 'none',
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: '10px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Categories Table */}
      <div style={{ marginLeft: '16%', padding: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>Categories</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Edit</th>
              <th scope="col">Category Name</th>
              <th scope="col">Image</th>
              <th scope="col">Creator Name</th>
              <th scope="col">Creator Email</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category:any) => (
              <tr key={category.id}>
                <td>
                    
                  <button className="btn btn-primary" onClick={() => openEditModal(category, true)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
                <td>{category.name}</td>
                <td><a href={`${API_BASE_URL_IMAGE}/${category.image}`}><img src={`${API_BASE_URL_IMAGE}/${category.image}`} height={80} alt={category.name} /> </a>  </td>
                <td>{category.creatorName}</td>
                <td>{category.email}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Subcategories Table */}
        <h1 style={{ textAlign: 'center' }}>Sub Categories</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Edit</th>
              <th scope="col">Category Name</th>
              <th scope="col">Sub Category Name</th>
              <th scope="col">Sub Creator Image</th>
              <th scope="col">Creator Name</th>
              <th scope="col">Creator Email</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {subcategories?.map((subcategory:any) => (
              <tr key={subcategory.id}>
                <td>
                  <button className="btn btn-primary" onClick={() => openEditModal(subcategory, false)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
                <td>{subcategory.cname}</td>
                <td>{subcategory.name}</td>
                <td><a href={`${API_BASE_URL_IMAGE}/${subcategory.image}`}>  <img src={`${API_BASE_URL_IMAGE}/${subcategory.image}`} height={80} alt={subcategory.name} /> </a></td>
                <td>{subcategory.creatorName}</td>
                <td>{subcategory.email}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteSubCategory(subcategory.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <AdminFooter />

      </div>
      <EditCategorySubcategoryModal
              show={showModal}
              onHide={() => setShowModal(false)}
              item={editingItem}
              isCategory={isEditingCategory}
              adminEmail={adminEmail || ''}

              onSuccess={() => queryClient.invalidateQueries({
                  queryKey: ['categories', 'subcategories'],
              })}
              categories={categories || []} // Pass actual categories data

                 />
    </div>
  );
}
