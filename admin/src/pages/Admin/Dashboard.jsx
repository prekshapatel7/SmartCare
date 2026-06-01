import React from 'react';

const DoctorsList = () => {
  // Simple check to determine the greeting text based on the time of day
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="p-6 bg-slate-50 min-h-screen w-full flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl border border-slate-100 shadow-xl p-8 md:p-12 text-center">
        
        {/* Simple Pulsing Brand Accent */}
        <div className="w-20 h-20 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
          </svg>
        </div>

        {/* Dynamic Welcome Heading */}
        <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">
          {greeting}, Administrator
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed mb-8">
          Welcome back to the <span className="font-semibold text-indigo-600">Smart Care</span> master control platform. Use the dashboard links below or the side panel to manage your system records.
        </p>

        <hr className="border-slate-100 my-6" />

        {/* Clean, Simple Shortcut Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          
          <div className="p-5 bg-slate-50/60 border border-slate-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/20 transition-all duration-200 group">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 group-hover:text-indigo-500">
              Medical Staff
            </div>
            <div className="text-base font-bold text-slate-700">
              Manage Doctors List
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Add new doctors, remove accounts, or manage active profiles.
            </p>
          </div>

          <div className="p-5 bg-slate-50/60 border border-slate-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/20 transition-all duration-200 group">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 group-hover:text-indigo-500">
              System Health
            </div>
            <div className="text-base font-bold text-slate-700">
              Operational Center
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Database connection status, cloud cluster clusters, and security settings.
            </p>
          </div>

        </div>

        {/* Clean Static Status Indicator */}
        <div className="mt-8 inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
            All Systems Online
          </span>
        </div>

      </div>
    </div>
  );
};

export default DoctorsList;