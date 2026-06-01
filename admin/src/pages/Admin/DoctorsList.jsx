import React, { useState, useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { aToken, backendUrl } = useContext(AdminContext);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/admin/all-doctors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'aToken': aToken
        }
      });

      const data = await response.json();

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (aToken) {
      fetchDoctors();
    }
  }, [aToken]);

  if (loading) {
    return (
      <div className="p-6 bg-slate-50 min-h-screen w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-slate-500">Loading verified medical specialists...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-slate-50 min-h-screen w-full flex items-center justify-center">
        <div className="bg-white border border-red-100 rounded-2xl p-8 max-w-md text-center shadow-sm">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">!</div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Data Retrieval Failed</h3>
          <p className="text-sm text-slate-500 mb-6">{error}</p>
          <button onClick={fetchDoctors} className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl text-sm transition-all">
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen w-full">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">All Doctors</h1>
          <p className="text-sm text-slate-500">Manage registered medical professionals and specialties.</p>
        </div>
        <div className="bg-indigo-50 border border-indigo-100/50 rounded-xl px-4 py-2 text-xs font-semibold text-indigo-700 self-start sm:self-auto">
          Total Registered: {doctors.length}
        </div>
      </div>

      {doctors.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center max-w-xl mx-auto">
          <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">No Doctors Found</h3>
          <p className="text-sm text-slate-500">There are currently no doctor profiles active inside your MongoDB database cluster.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {doctors.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-md hover:border-slate-200/80 transition-all duration-200">
              <div className="p-6 bg-slate-50/70 border-b border-slate-100 flex items-center justify-center relative">
                <div className="w-20 h-20 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-2xl uppercase shadow-inner">
                  {item.name ? item.name.charAt(0) : 'D'}
                </div>
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-slate-100 px-2 py-1 rounded-md text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                  {item.degree || 'MD'}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
                    {item.speciality}
                  </div>
                  <h3 className="text-base font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5 line-clamp-1">
                    {item.email}
                  </p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs border-t border-slate-100 pt-4">
                    <div>
                      <span className="text-slate-400 block">Experience</span>
                      <span className="font-semibold text-slate-700">{item.experience || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Fees</span>
                      <span className="font-semibold text-slate-700">${item.fees}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;