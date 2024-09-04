import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useGetCategories, useGetSubCategoriesByCategory } from './api/categoryApi';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Categories: React.FC = React.memo(() => {
  const { data: categories, isLoading: isCategoriesLoading, isError: isCategoriesError } = useGetCategories();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const handleMouseEnter = useCallback((categoryId: string) => {
    setHoveredCategory(categoryId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCategory(null);
  }, []);

  const { data: subCategories = [], isLoading: isSubCategoriesLoading, isError: isSubCategoriesError } = useGetSubCategoriesByCategory(hoveredCategory || '');

  if (isCategoriesLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Spinner animation="border" role="status" size="sm">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>;
  }

  if (isCategoriesError) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Spinner animation="border" role="status" size="sm">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>;
  }

  return (
    <div style={{ paddingLeft: '8%', paddingBottom: '1%' }}>
      <div className="dropdown">
        <a
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <b>All Categories <FontAwesomeIcon icon={faCaretDown} /></b>
        </a>

        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {categories?.map((category: any) => (
            <div
              key={category.id}
              onMouseEnter={() => handleMouseEnter(category.id)}
              onMouseLeave={handleMouseLeave}
              style={{ position: 'relative' }}
            >
              <Link className="dropdown-item" to={`/product-category/${category.id}`}>
                {category.name}
              </Link>
              {hoveredCategory === category.id && (
                <div className="dropdown-submenu" style={{
                  position: 'absolute',
                  left: '100%',
                  top: 0,
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  padding: '0',
                  zIndex: 1000,
                }}>
                  {isSubCategoriesLoading ? (
                    <div></div>
                  ) : isSubCategoriesError ? (
                    <div>Error loading subcategories.</div>
                  ) : subCategories.length > 0 ? (
                    subCategories.map((subCategory: any) => (
                      <Link key={subCategory.id} className="dropdown-item" to={`/allproduct/${subCategory.id}`}>
                        {subCategory.name}
                      </Link>
                    ))
                  ) : (
                    <div className="dropdown-item">No Subcategories</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Categories;
