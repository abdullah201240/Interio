import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import AdminFooter from './AdminFooter';
import '../assets/css/AdminCreateSubAdmin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { useNavigate } from 'react-router-dom';
import {
    useCreateHeroSection,
    useGetAllHeroSections,
    useUpdateHeroSection,
    useDeleteHeroSection
} from './api/heroSectionApi';
import { API_BASE_URL_IMAGE } from '../config';

interface FormDataType {
    description: string;
    image: File | null;
}

interface HeroSection {
    id: number;
    description: string;
    image: string;
    name: string;
    email: string;
}

export default function AdminHeroSection() {
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState<'success' | 'error'>('success');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedHeroId, setSelectedHeroId] = useState<number | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingHero, setEditingHero] = useState<HeroSection | null>(null);
    const [formData, setFormData] = useState<FormDataType>({
        description: '',
        image: null
    });
    
    
    
    

    const adminEmail = useSelector((state: RootState) => state.adminAuth.email);
    const navigate = useNavigate();

    const { data: heroSections = [], refetch: refetchHeroSections } = useGetAllHeroSections();
    const { mutate: createHeroSection } = useCreateHeroSection({
        onSuccess: () => {
            refetchHeroSections();
            triggerPopup('Hero section created successfully!', 'success');
            resetForm();
        },
        onError: () => {
            triggerPopup('Failed to create hero section. Please try again.', 'error');
        }
    });

    const { mutate: updateHeroSection } = useUpdateHeroSection({
        onSuccess: () => {
            refetchHeroSections();
            triggerPopup('Hero section updated successfully!', 'success');
            setShowEditModal(false);
            setEditingHero(null);
            resetForm();
        },
        onError: () => {
            triggerPopup('Failed to update hero section. Please try again.', 'error');
        }
    });

    const { mutate: deleteHeroSection } = useDeleteHeroSection({
        onSuccess: () => {
            refetchHeroSections();
            triggerPopup('Hero section deleted successfully!', 'success');
            setShowDeleteConfirm(false);
        },
        onError: () => {
            triggerPopup('Failed to delete hero section. Please try again.', 'error');
        }
    });

    useEffect(() => {
        if (!adminEmail) {
            navigate('/admin/login');
        }
    }, [adminEmail, navigate]);

    const triggerPopup = (message: string, type: 'success' | 'error') => {
        setPopupMessage(message);
        setPopupType(type);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 3000);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({
                ...formData,
                image: e.target.files[0],
            });
        }
    };

    const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData();
        data.append('email', adminEmail || '');
        data.append('description', formData.description);
        if (formData.image) {
            data.append('image', formData.image);
        }


        createHeroSection(data);
        triggerPopup('Hero section Create successfully!', 'success');
        setFormData({
            description: '',
            image: null
        });
        setEditingHero(null);


    };

    const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editingHero) {
            const data = new FormData();
            data.append('email', adminEmail || '');
            data.append('description', formData.description);
            if (formData.image) {
                data.append('image', formData.image);
            }


            updateHeroSection(
                { id: editingHero.id, data },
                {
                    onSuccess: () => {
                        refetchHeroSections();
                        triggerPopup('Hero section updated successfully!', 'success');
                        setShowEditModal(false);
                        setEditingHero(null);
                        resetForm();
                    },
                    onError: () => {
                        triggerPopup('Failed to update hero section. Please try again.', 'error');
                    },
                }
            );
        }
    };


    const handleDelete = () => {
        if (selectedHeroId) {
            deleteHeroSection(selectedHeroId);
            setShowDeleteConfirm(false);
        }
    };

    const openEditModal = (hero: HeroSection) => {
        setEditingHero(hero);
        setFormData({
            description: hero.description,
            image: null
        });
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setEditingHero(null);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            description: '',
            image: null
        });
        setEditingHero(null);
    };

    return (
        <div className="admin-hero-section" style={{ background: 'rgb(243, 242, 247)' }}>
            <div className="admin-navbar" style={{ background: 'white' }}>
                <AdminNavbar />
            </div>
            <div className="admin-content">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="content-section" style={{ background: 'rgb(243, 242, 247)' }}>
                    <br />
                    <form
                        className="create-subadmin-form"
                        onSubmit={editingHero ? handleUpdateSubmit : handleCreateSubmit}
                    >
                        <h1 className="form-title" style={{ textAlign: 'center' }}>
                            {editingHero ? 'Edit Hero Section' : 'Create Hero Section'}
                        </h1>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Enter description"
                                value={formData.description}
                                onChange={handleChange}
                                className="form-input"
                                style={{ width: '100%' }}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Upload Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleFileChange}
                                className="form-input"
                                required={!editingHero}
                            />
                        </div>
                        <button type="submit" className="submit-btn">
                            {editingHero ? 'Update' : 'Submit'}
                        </button>
                    </form>
                </div>
                {showPopup && (
                    <div className={`popup2 ${popupType}`}>
                        <div className="popup2-content">
                            <p>{popupMessage}</p>
                            <button onClick={() => setShowPopup(false)} className="popup2-close-btn">Close</button>
                        </div>
                    </div>
                )}
                {showDeleteConfirm && (
                    <div className="popup2 confirm-delete">
                        <div className="popup2-content">
                            <p>Are you sure you want to delete this hero section?</p>
                            <div className="container">
                                <div className="row row-cols-2">
                                    <div className="col">
                                        <button
                                            onClick={handleDelete}
                                            className="popup2-confirm-btn"
                                            style={{ background: 'red' }}
                                        >
                                            Yes
                                        </button>
                                    </div>
                                    <div className="col">
                                        <button
                                            onClick={() => setShowDeleteConfirm(false)}
                                            className="popup2-cancel-btn"
                                            style={{ background: 'blue' }}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {showEditModal && editingHero && (
                    <div className="popup2 edit-modal">
                        <div className="popup2-content">
                            <form onSubmit={handleUpdateSubmit}>
                                <h1 className="form-title" style={{ textAlign: 'center' }}>Edit Hero Section</h1>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Enter description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="form-input"
                                        style={{ width: '100%' }}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image">Upload Image</label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        onChange={handleFileChange}
                                        className="form-input"
                                    />
                                </div>
                                <button type="submit" className="btn btn-success" >Update</button>
                                <button type="button" onClick={closeEditModal} className="btn btn-primary">Cancel</button>
                            </form>
                        </div>
                    </div>
                )}
                <br />
                <div className="content-section" style={{ width: '82%' }}>
                    <div className="header">
                        <h1 style={{ textAlign: 'center' }}>All Hero Sections</h1>
                    </div>
                    <br />
                    <div className="table-wrapper">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Edit</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Email</th>

                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {heroSections.map((hero: HeroSection) => (
                                    <tr key={hero.id}>
                                        <td><button
                                                className="table-action-btn"
                                                style={{background:'blue'}}
                                                onClick={() => openEditModal(hero)}
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button></td>
                                        <td>{hero.description}</td>
                                        <td>
                                            <img
                                                src={`${API_BASE_URL_IMAGE}/${hero.image}`}
                                                alt="Hero"
                                                style={{ width: '100px', height: '100px' }}
                                            />
                                        </td>
                                        <td>
                                            {hero.name}


                                        </td>
                                        <td>
                                            {hero.email}


                                        </td>
                                        <td>
                                        
                                            <button
                                                className="table-action-btn4"
                                                style={{background:'red'}}
                                                onClick={() => {
                                                    setSelectedHeroId(hero.id);
                                                    setShowDeleteConfirm(true);
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <AdminFooter />
        </div>
    );
}
