import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom' // 1. Imported useNavigate
import { AppContext } from '../context/AppContext'

const Doctors = () => {

  const { speciality } = useParams()
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate() // 2. Initialized the navigate function

  const filteredDoctors = speciality
    ? doctors.filter((doc) => doc.speciality === speciality)
    : doctors

  return (
    <div className='container mx-auto px-4 py-5'>

      <p className='text-gray-600 text-lg mb-5'>
        Browse through the doctors specialist.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5'>
        {
          filteredDoctors.map((item, index) => (
            <div
              key={index}
              /* 3. Added onClick to navigate to the appointment page using the doctor's ID */
              onClick={() => navigate(`/appointment/${item._id}`)} 
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between bg-white shadow-sm hover:shadow-md'
            >
              {/* Image container */}
              <div className='w-full h-56 bg-blue-50 overflow-hidden flex items-center justify-center'>
                <img
                  className='w-full h-full object-cover object-top'
                  src={item.image}
                  alt={item.name}
                />
              </div>

              {/* Card Details */}
              <div className='p-4 flex-grow flex flex-col justify-between'>
                <div>
                  <div className='flex items-center gap-2 text-sm text-green-500 mb-1'>
                    <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                    <p>Available</p>
                  </div>

                  <p className='text-gray-900 text-lg font-medium line-clamp-1'>
                    {item.name}
                  </p>
                </div>

                <p className='text-gray-600 text-sm mt-1'>
                  {item.speciality}
                </p>
              </div>

            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Doctors