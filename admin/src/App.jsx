import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import { Navbar } from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Admin/Dashboard';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';

const App = () => {
  const { aToken } = useContext(AdminContext)

  return aToken ? (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="app-layout">
        <style>{`
          .app-layout {
            display: flex;
            align-items: flex-start;
          }
        `}</style>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/add-doctor' element={<AddDoctor />} />
          <Route path='/admin/doctors-list' element={<DoctorsList />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App