import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 py-20 text-slate-800 max-w-7xl mx-auto px-4'>
      
      {/* Dynamic Header Section */}
      <div className='text-center max-w-md'>
        <span className='text-[11px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full'>
          Elite Team
        </span>
        <h2 className='text-3xl font-extrabold text-slate-800 tracking-tight mt-3 sm:text-4xl'>
          Top Rated Clinicians
        </h2>
        <p className='text-slate-500 mt-3 text-sm leading-relaxed'>
          Connect with our most highly recommended medical specialists available for bookings today.
        </p>
      </div>

      {/* Premium Multi-Column Grid */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-10'>
        {doctors.slice(0, 8).map((item, index) => (
          <div 
            onClick={() => {
              navigate(`/Appointment/${item._id}`)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            key={index}
            className='group bg-white rounded-2xl border border-slate-100 overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1.5 transition-all duration-300 flex flex-col'
          >
            
            {/* Image Container Frame */}
            <div className='relative overflow-hidden bg-slate-50 h-[240px]'>
              <img
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                src={item.image}
                alt={item.name}
              />
              
              {/* Premium Floating Status Badge */}
              <div className='absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm'>
                <span className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse'></span>
                <span className='text-[11px] font-semibold text-emerald-700 tracking-wider uppercase'>
                  Available
                </span>
              </div>
            </div>

            {/* Info and Metadata Panel */}
            <div className='p-5 flex-grow flex flex-col justify-between'>
              <div>
                <span className='text-[11px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded'>
                  {item.speciality}
                </span>
                <h3 className='text-slate-800 font-semibold text-base mt-2.5 group-hover:text-blue-600 transition-colors'>
                  {item.name}
                </h3>
              </div>

              {/* Dynamic Interactive Card Footer */}
              <div className='mt-5 pt-3 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400 font-medium'>
                <span className='group-hover:text-blue-600 transition-colors'>Book Appointment</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Styled Modern Action Button */}
      <button
        onClick={() => {
          navigate('/doctors')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        className='mt-12 bg-blue-50/60 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-100 hover:border-blue-600 px-10 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-sm hover:shadow-md hover:shadow-blue-100 transition-all duration-300'
      >
        View All Specialists
      </button>

    </div>
  )
}

export default TopDoctors