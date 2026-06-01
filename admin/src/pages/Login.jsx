import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { assets } from '../../../frontend/src/assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Destructure the context states and variables cleanly
  const { setAToken, backendUrl } = useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send a POST request with the user credentials to your admin login endpoint exclusively
      const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
      
      if (data.success) {
        // 1. Store the token string inside LocalStorage so the session persists on page refreshes
        localStorage.setItem('aToken', data.token);
        
        // 2. Pass the token to your Context State so the rest of the application updates instantly
        setAToken(data.token);
        
        toast.success("Admin Login Successful!");
        console.log("Token securely saved:", data.token);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Authentication Error:", error);
      toast.error(error.response?.data?.message || "Could not connect to the server");
    }
  };

  return (
    <div className="login-container">
      {/* Scope-contained style rules block mapped directly to clean native classnames */}
      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f4f7f6;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 20px;
          box-sizing: border-box;
        }
        .login-form-card {
          background-color: #ffffff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          width: 100%;
          max-width: 400px;
          box-sizing: border-box;
        }
        .login-header {
          font-size: 24px;
          font-weight: 600;
          color: #1e293b;
          text-align: center;
          margin-bottom: 24px;
          margin-top: 0;
        }
        .header-span {
          color: #0284c7;
        }
        .input-group {
          margin-bottom: 20px;
        }
        .input-label {
          font-size: 14px;
          font-weight: 500;
          color: #64748b;
          margin-bottom: 6px;
          margin-top: 0;
        }
        .input-field {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 15px;
          color: #334155;
          outline: none;
          box-sizing: border-box;
          background-color: #f8fafc;
        }
        .login-btn {
          width: 100%;
          padding: 14px;
          background-color: #0284c7;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
          box-sizing: border-box;
        }
      `}</style>

      <form onSubmit={handleSubmit} className="login-form-card">
        <div>
          <p className="login-header">
            <span className="header-span">Admin</span> Login
          </p>
          
          {/* Email Input Field */}
          <div className="input-group">
            <p className="input-label">Email</p>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              className="input-field" 
              required 
            />
          </div>
          
          {/* Password Input Field */}
          <div className="input-group">
            <p className="input-label">Password</p>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="input-field" 
              required 
            />
          </div>
          
          <button type="submit" className="login-btn">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;