import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Login = () => {
  // 1. Tracks whether the user is viewing the "Create Account" layout or "Login" layout
  const [isSignUp, setIsSignUp] = useState(false)

  // 2. Manage all text inputs inside a single object state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })

  // 3. Handle live input text modifications dynamically
  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    })
  }

  const navigate = useNavigate()
  const { login, setUserData } = useContext(AppContext)

  // 4. Fully intercepted form submission handler
  const handleSubmit = (e) => {
    e.preventDefault() // Stops the browser from refreshing the page!

    if (isSignUp) {
      const newUserData = {
        name: formData.fullName || 'Patient',
        email: formData.email,
        password: formData.password,
        phone: '',
        address: {
          line1: '',
          line2: ''
        },
        gender: 'Male',
        dob: '2000-01-01'
      }

      setUserData(newUserData)
      alert(`Signup successful. You can now login as ${formData.email}`)
      setFormData({ fullName: '', email: '', password: '' })
      setIsSignUp(false)
    } else {
      console.log('Authenticating User Credentials:', formData.email)
      const authenticated = login(formData.email, formData.password)
      if (authenticated) {
        alert(`Logged in successfully: ${formData.email}`)
        navigate('/')
      } else {
        alert('Email or password is incorrect. Please try again.')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Container Box - Reduced maximum width from max-w-5xl to max-w-4xl, min-h down to 500px */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
        
        {/* --- Left Column: Context Branding Panel --- */}
        <div className="hidden md:flex md:col-span-5 relative bg-indigo-900 text-white p-8 flex-col justify-between overflow-hidden">
          {/* Background Image Reference Visual with Tint Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="image_ca0f02.jpg" 
              alt="Healthcare Professionals" 
              className="w-full h-full object-cover opacity-20 transform scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/60 to-indigo-950/90"></div>
          </div>

          {/* Core App Information Titles */}
          <div className="relative z-10">
            <span className="text-[10px] font-bold tracking-widest uppercase bg-indigo-500/30 px-2.5 py-1 rounded-full border border-indigo-400/20">
              Wellness Network
            </span>
            <h2 className="text-2xl font-bold mt-4 leading-tight">
              {isSignUp ? 'Your Journey to Better Health Starts Here.' : 'Welcome Back to Your Secure Space.'}
            </h2>
          </div>

          <div className="relative z-10">
            <p className="text-xs text-indigo-200 leading-relaxed">
              Join thousands of patient profiles who coordinate consultations and track digital prescriptions seamlessly.
            </p>
          </div>
        </div>

        {/* --- Right Column: Interactive Form Panel --- */}
        <div className="col-span-1 md:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-center bg-white">
          <div className="w-full max-w-sm mx-auto">
            
            {/* Dynamic Card Text Header */}
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight transition-all">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                {isSignUp ? 'Please sign up to book appointment' : 'Please log in to manage your appointments'}
              </p>
            </div>

            {/* Core Form Element */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* CONDITIONAL FULL NAME FIELD */}
              {isSignUp && (
                <div>
                  <label className="block text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe" 
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
                    required={isSignUp}
                  />
                </div>
              )}

              {/* EMAIL FIELD */}
              <div>
                <label className="block text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com" 
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
                  required
                />
              </div>

              {/* PASSWORD FIELD */}
              <div>
                <label className="block text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••" 
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
                  required
                />
              </div>

              {/* SUBMIT ACTION BUTTON */}
              <button 
                type="submit" 
                className="w-full mt-1 bg-indigo-600 text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-md hover:bg-indigo-700 active:bg-indigo-800 hover:shadow-lg transition-all duration-150 transform active:scale-[0.99] cursor-pointer"
              >
                {isSignUp ? 'Create account' : 'Login'}
              </button>
            </form>

            {/* TOGGLE WORKFLOW LINKS */}
            <div className="mt-6 text-center border-t border-gray-100 pt-4">
              <p className="text-xs sm:text-sm text-gray-500">
                {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}{' '}
                <button 
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition-colors bg-transparent border-none p-0 cursor-pointer outline-none text-xs sm:text-sm"
                >
                  {isSignUp ? 'Login here' : 'Register here'}
                </button>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Login