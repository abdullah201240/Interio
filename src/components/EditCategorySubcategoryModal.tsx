import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useUpdateCategory, useUpdateSubCategory } from './api/categoryApi'; // Import your API hooks here

type EditCategorySubcategoryModalProps = {
  show: boolean;
  onHide: () => void;
  item: any; // The category or subcategory to edit
  isCategory: boolean; // True if editing a category, false for subcategory
  adminEmail: string; // Required email property
  onSuccess: () => void;
  categories: Array<{ id: string; name: string }>; // List of categories
};

const EditCategorySubcategoryModal: React.FC<EditCategorySubcategoryModalProps> = ({
  show, onHide, item, isCategory, adminEmail, onSuccess, categories
}) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [cid, setCid] = useState('');

  const updateCategoryMutation = useUpdateCategory({
    onSuccess: () => {
      alert('Category updated successfully.');
      onHide();
      onSuccess();
    },
    onError: () => {
      alert('Failed to update category. Please try again.');
    },
  });

  const updateSubCategoryMutation = useUpdateSubCategory({
    onSuccess: () => {
      alert('Sub-category updated successfully.');
      onHide();
      onSuccess();
    },
    onError: () => {
      alert('Failed to update sub-category. Please try again.');
    },
  });

  useEffect(() => {
    if (item) {
      setName(item.name);
      setImage(null); // Reset image
      if (!isCategory) {
        setCid(item.cid);
      }
    }
  }, [item, isCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', adminEmail); // Include adminEmail
    if (image) {
      formData.append('image', image);
    }
    if (!isCategory) {
      formData.append('cid', cid);
    }

    const id = item.id;

    if (isCategory) {
      updateCategoryMutation.mutate({ id, formData });
    } else {
      updateSubCategoryMutation.mutate({ id, formData });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isCategory ? 'Edit Category' : 'Edit Sub-Category'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          {!isCategory && (
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={cid}
                onChange={(e) => setCid(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          )}
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditCategorySubcategoryModal;
