import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)

  return (
    <div className="sidebar-container">
      <style>{`
        .sidebar-container {
          min-height: 100vh;
          width: 260px;
          background-color: #ffffff;
          border-right: 1px solid #e2e8f0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding-top: 20px;
          box-sizing: border-box;
        }
        .sidebar-list {
          list-style: none;
          padding: 0;
          margin: 0;
          width: 100%;
        }
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 24px;
          color: #475569;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.2s ease;
          border-left: 4px solid transparent;
        }
        .sidebar-link:hover {
          background-color: #f8fafc;
          color: #1e293b;
        }
        .sidebar-link img {
          width: 20px;
          height: 20px;
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }
        .sidebar-link:hover img {
          opacity: 1;
        }
        /* Active route styling matching professional dashboard patterns */
        .sidebar-link.active {
          background-color: #f0f7ff;
          color: #1062fe;
          border-left-color: #1062fe;
        }
        .sidebar-link.active img {
          opacity: 1;
          filter: drop-shadow(0px 0px 1px #1062fe);
        }
        .sidebar-link p {
          margin: 0;
        }
      `}</style>

      {aToken && (
        <ul className="sidebar-list">
          <li>
            <NavLink to={'/admin/dashboard'} className="sidebar-link">
              <img src={assets.home_icon} alt="" />
              <p>Dashboard</p>
            </NavLink>
          </li>
          
         

          <li>
            <NavLink to={'/admin/add-doctor'} className="sidebar-link">
              <img src={assets.add_icon || assets.home_icon} alt="" />
              <p>Add Doctor</p>
            </NavLink>
          </li>

          <li>
            <NavLink to={'/admin/doctors-list'} className="sidebar-link">
              <img src={assets.people_icon || assets.home_icon} alt="" />
              <p>Doctors List</p>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  )
}

export default Sidebar