import React from 'react'
import { Routes, Route } from 'react-router-dom'  
import Home from './pages/Home'
import About from './pages/About'
import Doctors from './pages/Doctors'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Myprofile from './pages/Myprofile'
import MyAppointments from './pages/MyAppointments'
import Navbar from './components/Navbar'
import Appointment from './pages/Appointment'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='mx-4 md:mx-[10%]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/Doctors' element={<Doctors />} />
        <Route path='/Doctors/:speciality' element={<Doctors />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/myprofile' element={<Myprofile />} />
        <Route path='/MyAppointments' element={<MyAppointments />} />
        <Route path='/Appointment/:docID' element={<Appointment />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App