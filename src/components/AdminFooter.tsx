import React from 'react';

const AdminFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer mt-auto py-1 bg-dark text-white">
      <div className="container d-flex justify-content-center align-items-center">
        <p className="mb-0 text-center">
          All Rights Reserved by{' '}
          <a href="https://digirib.com/" className="text-decoration-none text-white font-weight-bold">
            Digirib
          </a>{' '}
          | {year}
        </p>
      </div>
    </footer>
  );
};

export default AdminFooter;
