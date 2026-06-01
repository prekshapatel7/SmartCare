import React, { useState, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

const AddDoctor = () => {
  const { aToken, backendUrl } = useContext(AdminContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    speciality: 'General physician',
    education: '',
    experience: '',
    fees: '',
    address1: '',
    address2: '',
    about: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        speciality: formData.speciality,
        degree: formData.education, 
        experience: formData.experience,
        fees: formData.fees,
        address1: formData.address1,
        address2: formData.address2,
        about: formData.about,
      };

      const response = await fetch(`${backendUrl}/api/admin/add-doctor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'aToken': aToken
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (data.success) {
        alert("Success! Doctor registered ");
        setFormData({
          name: '',
          email: '',
          password: '',
          speciality: 'General physician',
          education: '',
          experience: '',
          fees: '',
          address1: '',
          address2: '',
          about: '',
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Could not reach back-end configuration context.");
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Add New Doctor Account</h1>
        <p className="text-sm text-slate-500">Register a new medical professional to the SmartCare platform.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm max-w-4xl p-8 space-y-8">
        <div>
          <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-4">1. Credentials & Identity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Doctor Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Dr. John Doe"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Doctor Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="johndoe@prescripto.com"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Account Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                required
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-4">2. Practice Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Medical Speciality</label>
              <select
                name="speciality"
                value={formData.speciality}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
              >
                <option value="General physician">General physician</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Education / Qualifications</label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="MD, MBBS, Ph.D."
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Years of Experience</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                required
              >
                <option value="">Select Experience</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="10 Years">10 Years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Consultation Fees ($)</label>
              <input
                type="number"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                placeholder="50"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Clinic Address Line 1</label>
              <input
                type="text"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
                placeholder="Suite, Building, Street"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Clinic Address Line 2</label>
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                placeholder="Locality, City, State"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-4">3. Biography</h3>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">About the Doctor</label>
            <textarea
              name="about"
              rows="4"
              value={formData.about}
              onChange={handleChange}
              placeholder="Write a brief professional overview of the doctor..."
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm resize-none"
              required
            ></textarea>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-sm transition-all focus:ring-4 focus:ring-indigo-100 text-sm"
          >
            Create Doctor Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;