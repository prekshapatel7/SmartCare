import React from 'react'

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 font-sans text-gray-800">
      
      {/* --- Header Section --- */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl uppercase">
          About <span className="text-indigo-600">Us</span>
        </h2>
        <div className="w-16 h-1 bg-indigo-600 mx-auto mt-3 rounded"></div>
      </div>

      {/* --- Main Content Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        {/* Image Column */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative rounded-2xl overflow-hidden shadow-lg max-w-md lg:max-w-full">
            <img 
              src="https://tse4.mm.bing.net/th/id/OIP.53c6OYIn_qw02YDSduBOXgHaHZ?rs=1&pid=ImgDetMain&o=7&rm=3" 
              alt="Healthcare Professionals" 
              className="w-full h-auto object-cover object-center transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Text Column */}
        <div className="lg:col-span-7 space-y-5">
          <p className="text-base leading-relaxed text-gray-600">
            Welcome to our modern wellness platform, designed to make professional healthcare accessible, intuitive, and efficient. We eliminate the friction of scheduling and data management, bridging the gap between individuals and reliable clinical care.
          </p>
          <p className="text-base leading-relaxed text-gray-600">
            Driven by technical innovation and a patient-first approach, we continuously upgrade our infrastructure. By combining smart scheduling with secure digital frameworks, we ensure your healthcare journey remains completely fluid.
          </p>
          
          {/* Mission Subsection */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Our Core Mission</h3>
            <p className="text-base leading-relaxed text-gray-600">
              To cultivate an interconnected ecosystem that empowers patients. By breaking down barriers between providers and users, we bring exceptional, reliable care straight to your fingertips exactly when you need it.
            </p>
          </div>
        </div>
      </div>

      {/* --- Why Choose Us Section --- */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
          Why Choose Us
        </h3>
        
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          
          {/* Feature Card 1 */}
          <div className="group bg-white text-gray-800 p-8 flex flex-col justify-center border-b md:border-b-0 hover:bg-indigo-600 transition-all duration-300 ease-in-out cursor-pointer">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3 text-indigo-600 group-hover:text-indigo-200 transition-colors duration-300">
               Innovation
            </h4>
            <h5 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-white transition-colors duration-300">
              INTELLIGENT SYSTEMS:
            </h5>
            <p className="text-gray-600 text-sm leading-relaxed group-hover:text-indigo-100 transition-colors duration-300">
              Utilizing smart allocation systems to match you with matching clinical specialists rapidly without unnecessary wait times.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="group bg-white text-gray-800 p-8 flex flex-col justify-center border-b md:border-b-0 md:border-l border-gray-200 hover:bg-indigo-600 transition-all duration-300 ease-in-out cursor-pointer">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3 text-indigo-600 group-hover:text-indigo-200 transition-colors duration-300">
               Accessibility
            </h4>
            <h5 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-white transition-colors duration-300">
              GLOBAL REACH:
            </h5>
            <p className="text-gray-600 text-sm leading-relaxed group-hover:text-indigo-100 transition-colors duration-300">
              Connect with vetted, accredited healthcare practitioners from the comfort of your home, or locate top-tier local clinics instantly.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="group bg-white text-gray-800 p-8 flex flex-col justify-center md:border-l border-gray-200 hover:bg-indigo-600 transition-all duration-300 ease-in-out cursor-pointer">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3 text-indigo-600 group-hover:text-indigo-200 transition-colors duration-300">
               Integrity
            </h4>
            <h5 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-white transition-colors duration-300">
              DATA PRIVACY:
            </h5>
            <p className="text-gray-600 text-sm leading-relaxed group-hover:text-indigo-100 transition-colors duration-300">
              Your health history belongs securely to you. We deploy end-to-end encryption architecture to keep your personal records fully confidential.
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default About