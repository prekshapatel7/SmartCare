import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const { token, logout } = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false)

  const navItems = [
    { path: '/', label: 'HOME' },
    { path: '/doctors', label: 'ALL DOCTORS' },
    { path: '/about', label: 'ABOUT' },
    { path: '/contact', label: 'CONTACT' },
  ]

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-6 border-b border-slate-100 bg-white sticky top-0 z-50 backdrop-blur-md bg-white/90'>
      
      {/* Brand Logo */}
      <div 
        onClick={() => navigate('/')} 
        className='flex items-center gap-2 cursor-pointer select-none group'
      >
       
        <h1 className='text-4xl font-bold tracking-tight text-blue-600 hidden sm:block'>
          Smart<span className='text-slate-800 font-medium'>Care</span>
        </h1>
      </div>

      {/* Sleek Middle Navigation */}
      <ul className='hidden md:flex items-center gap-2 bg-slate-50/80 p-1.5 rounded-full border border-slate-100/50 font-medium text-slate-600'>
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} className='relative'>
            {({ isActive }) => (
              <li className={`px-5 py-2 rounded-full text-xs tracking-wider font-semibold transition-all duration-300 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'hover:text-blue-600 hover:bg-slate-100/60'
              }`}>
                {item.label}
              </li>
            )}
          </NavLink>
        ))}
      </ul>

      {/* Right Action Side */}
      <div className='flex items-center gap-4'>
        {token ? (
          <div className='relative group flex items-center gap-2 cursor-pointer py-2'>
            {/* User Avatar Circle */}
            <div className='relative ring-2 ring-blue-100 group-hover:ring-blue-400 rounded-full p-0.5 transition-all'>
              <img
                className='w-8 h-8 rounded-full object-cover'
                src={assets.profile_pic}
                alt="User Profile"
              />
              <span className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full'></span>
            </div>
            
            <img
              className='w-2.5 opacity-60 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all'
              src={assets.dropdown_icon}
              alt=""
            />

            {/* Premium Multi-layer Dropdown Menu */}
            <div className='absolute top-full right-0 mt-1 w-52 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 origin-top-right z-50 p-1.5'>
              
              <div className='px-3 py-2 border-b border-slate-50 mb-1'>
                <p className='text-xs text-slate-400 font-medium'>Welcome back</p>
                <p className='text-xs font-semibold text-slate-700 truncate'>Patient Account</p>
              </div>

              <button
                onClick={() => navigate('/myprofile')}
                className='w-full text-left px-3 py-2 text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors'
              >
                My Profile
              </button>

              <button
                onClick={() => navigate('/MyAppointments')}
                className='w-full text-left px-3 py-2 text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors'
              >
                My Appointments
              </button>

              <div className='h-px bg-slate-50 my-1'></div>

              <button
                onClick={() => {
                  logout()
                  navigate('/login')
                }}
                className='w-full text-left px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors'
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide shadow-md shadow-blue-100 hover:shadow-lg hover:shadow-blue-200 -translate-y-0 active:translate-y-0 transition-all duration-200'
          >
            Create account
          </button>
        )}
      </div>

    </div>
  )
}

export default Navbar