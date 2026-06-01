import React from 'react'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col md:flex-row  rounded-2xl overflow-hidden my-20 min-h-[350px]'>

      {/* Left Side */}
      <div className='flex-1 py-8 sm:py-10 lg:py-20 px-6 sm:px-10 md:px-14 lg:px-12 flex flex-col justify-center'>

        <div className='text-3xl sm:text-4xl md:text-5xl font-semibold text-blackng-tight'>
          <p>Book Appointment</p>
          <p className='mt-4'>With 100+ Trusted</p>
          <p>Doctors</p>
        </div>

        <button
          onClick={() => {
            navigate('/login')
            window.scrollTo(0, 0)
          }}
className='bg-blue-600 text-white px-8 py-3 rounded-full mt-8 w-fit hover:bg-blue-700 hover:scale-105 transition-all duration-300'        >
          Create account
        </button>

      </div>

      {/* Right Side */}
      <div className='hidden md:block md:w-1/2 lg:w-[45%]'>

        <img
          className='w-full h-full object-cover object-center'
          src="https://img.magnific.com/premium-psd/portrait-smiling-female-doctor-isolated-white-background_944525-22124.jpg"
          alt='Doctors'
        />

      </div>

    </div>
  )
}

export default Banner