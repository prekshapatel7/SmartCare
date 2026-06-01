import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'

export const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)

  const logout = () => {
    if (aToken) {
      setAToken('')
      localStorage.removeItem('aToken')
    }
  }

  return (
    <div className="navbar-wrapper">
      <style>{`
        .navbar-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 40px;
          border-bottom: 1px solid #e2e8f0;
          background-color: #ffffff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .navbar-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .navbar-logo {
          font-size: 26px;
          font-weight: 700;
          color: #1e293b;
          letter-spacing: -0.5px;
        }
        .logo-accent {
          color: #1062fe;
        }
        .role-tag {
          font-size: 13px;
          font-weight: 500;
          color: #64748b;
          border: 1px solid #cbd5e1;
          padding: 3px 14px;
          border-radius: 9999px;
          background-color: #f8fafc;
        }
        .logout-btn {
          background-color: #5f6fff;
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          padding: 10px 32px;
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .logout-btn:hover {
          background-color: #4f5edd;
        }
      `}</style>

      <div className="navbar-left">
        <h1 className="navbar-logo">
          <span className="logo-accent">Smart</span>Care
        </h1>
        <span className="role-tag">Admin</span>
      </div>

      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  )
}