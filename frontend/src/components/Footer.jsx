import React from 'react'

const Footer = () => {
  return (
    <div className='mt-20 px-6 md:px-16 lg:px-24'>

      {/* Top Section */}
      <div className='flex flex-col md:flex-row justify-between gap-10'>

        {/* Left */}
        <div className='md:w-1/3'>
          <div className='text-2xl font-semi bold text-black mb-4'>
            Smart Care
          </div>

          <p className='text-gray-600 text-sm leading-6'>
           SmartCare is a smart healthcare platform that makes booking doctor appointments quick and easy.
We connect patients with trusted doctors for reliable and seamless care.
Manage appointments, check availability, and stay updated in one simple place.
Our goal is to improve healthcare access with convenience, efficiency, and care.</p>
        </div>

        {/* Company */}
        <div>
  {/* Column Title */}
  <p className='text-xl font-medium mb-5 text-gray-900'>HEAD OFFICE</p>
  
  {/* Non-interactive Text Content */}
  <div className='flex flex-col gap-2 text-gray-600 text-sm leading-relaxed'>
    <p>101, Business Circle, Ahmedabad, Gujarat</p>
    <p>Phone: +91 98765 43210</p>
    <p>Email: support@smartcare.com</p>
  </div>
</div>

        {/* Get in Touch */}
        <div>
          <h2 className='font-semibold text-gray-900 mb-4'>GET IN TOUCH</h2>
          <ul className='space-y-2 text-gray-600'>
            <li>+0-000-000-000</li>
            <li>smartcare.bypreksha@gmail.com</li>
            <li>Ahmedabad, Gujarat</li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <div className='border-t mt-10'></div>

      {/* Bottom */}
      <p className='text-center text-sm text-gray-500 mt-6'>
       © 2026 Prescripto. Empowering smarter healthcare access.
      </p>

    </div>
  )
}

export default Footer