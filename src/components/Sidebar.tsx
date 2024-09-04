import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../assets/img/logo.png';
import { useAppDispatch } from './hooks/adminLogin';
import { clearAdminAuth } from './redux/adminAuthSlice';


const Sidebar = () => {
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAdminAuth());
    navigate('/admin/login');
  };

  const activeStyle = {
    backgroundColor: 'yellow',
    color: 'black',
  };

  const hoverStyle = {
    backgroundColor: 'orange',
    color: 'white',
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor;
    e.currentTarget.style.color = hoverStyle.color;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget.classList.contains('active')) {
      e.currentTarget.style.backgroundColor = '';
      e.currentTarget.style.color = '';
    }
  };

 

  return (
    <div style={{ display: 'flex', height: '100vh', overflowY: 'auto' }}>
      <CDBSidebar
        textColor="black"
        backgroundColor="white"
        breakpoint={0}
        toggled={false}
        minWidth={''}
        maxWidth={''} className={''}      >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/admin-home" className="text-decoration-none" style={{ color: 'black' }}>
            <img src={Logo} alt="Logo" width={80} />
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink
              to="/admin-home"
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <CDBSidebarMenuItem icon="tachometer-alt">Dashboard</CDBSidebarMenuItem>
              </div>
            </NavLink>

            <NavLink
              to="/admin/all-products"
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <CDBSidebarMenuItem icon="boxes">All Products</CDBSidebarMenuItem>
              </div>
            </NavLink>

            <NavLink
              to="/admin/categories"
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <CDBSidebarMenuItem icon="tags">Categories</CDBSidebarMenuItem>
              </div>
            </NavLink>

            <NavLink
              to="/admin/order"
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <CDBSidebarMenuItem icon="shopping-cart">Orders</CDBSidebarMenuItem>
              </div>
            </NavLink>

            <NavLink
              to="/admin/create-order"
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <CDBSidebarMenuItem icon="plus-circle">Create Orders</CDBSidebarMenuItem>
              </div>
            </NavLink>
            <NavLink
              to="/admin/myorder"
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <CDBSidebarMenuItem icon="shopping-cart">My Orders</CDBSidebarMenuItem>
              </div>
            </NavLink>

            
            <NavLink
              to="/admin/customers"
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <CDBSidebarMenuItem icon="users">All Customers</CDBSidebarMenuItem>
              </div>
            </NavLink>

            <NavLink
              to="/admin/hero/section"
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <CDBSidebarMenuItem icon="image">Hero Section</CDBSidebarMenuItem>
              </div>
            </NavLink>

            


            <div
              onClick={handleLogout}
              style={{ cursor: 'pointer' }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <CDBSidebarMenuItem icon="sign-out-alt">Logout</CDBSidebarMenuItem>
            </div>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
