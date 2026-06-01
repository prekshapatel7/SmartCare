import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-transparent px-6 md:px-10 lg:px-20 items-center my-10 min-h-[500px]'>

      {/* Left Side: Text and CTA Links */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 md:py-16 z-10'>

        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight'>
          Connect with <br className='hidden lg:block' />
          <span className='text-[#5F6FFF]'>verified</span> medical experts
        </h1>

        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 text-gray-600 text-sm font-medium'>
          <img
            className='w-24 object-contain'
            src={assets.group_profiles}
            alt="Group Profiles"
          />
          <p className='leading-relaxed'>
            Simply browse through our extensive list of trusted doctors,
            <br className='hidden sm:block' />
            and schedule your appointment hassle-free.
          </p>
        </div>

        <a
          className='flex items-center gap-2 bg-[#5F6FFF] px-8 py-3 rounded-full text-white text-sm font-semibold shadow-lg shadow-[#5F6FFF]/20 hover:bg-[#4b59e6] hover:scale-105 transition-all duration-300 m-auto md:m-0'
          href="#speciality"
        >
          Book Appointment
          <img
            className='w-3 brightness-0 invert'
            src={assets.arrow_icon}
            alt="Arrow"
          />
        </a>

      </div>

      {/* Right Side: Square frame with the new group image flush to the bottom */}
      <div className='md:w-1/2 flex items-center justify-center w-full self-stretch min-h-[400px] md:min-h-[500px]'>
        
        {/* Background Container - overflow-hidden cuts the image bounds perfectly */}
        <div className='relative w-80 h-80 sm:w-[400px] sm:h-[400px] md:w-[420px] md:h-[420px] lg:w-[460px] lg:h-[460px] bg-white rounded-3xl shadow-xl shadow-[#5F6FFF]/10 flex justify-center items-end overflow-hidden'>
          
          {/* New wide group image asset positioned flat against the baseline floor */}
          <img
            className='w-full h-auto max-h-[95%] object-contain block align-bottom'
            src="https://static.vecteezy.com/system/resources/previews/032/840/698/large_2x/group-of-doctors-standing-together-on-white-background-ai-generative-photo.jpeg"
            alt="Medical Experts Group Team"
          />
          
        </div>

      </div>

    </div>
  )
}

export default Header