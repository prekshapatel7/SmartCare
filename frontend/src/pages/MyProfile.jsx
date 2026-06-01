import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'

const MyProfile = () => {

  const { userData, setUserData } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const [editData, setEditData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'Male',
    dob: '2000-01-20',

    address: {
      line1: '',
      line2: ''
    }
  })

  // LOAD USER DATA
  useEffect(() => {

    if (userData) {

      setEditData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        gender: userData.gender || 'Male',
        dob: userData.dob || '2000-01-20',

        address: {
          line1: userData.address?.line1 || '',
          line2: userData.address?.line2 || ''
        }
      })

    }

  }, [userData])

  // HANDLE INPUT CHANGE
  const handleInputChange = (e) => {

    const { name, value } = e.target

    if (name.startsWith('address.')) {

      const field = name.split('.')[1]

      setEditData((prev) => ({
        ...prev,

        address: {
          ...prev.address,
          [field]: value
        }
      }))

    } else {

      setEditData((prev) => ({
        ...prev,
        [name]: value
      }))

    }

  }

  // SAVE PROFILE
  const handleSave = () => {

    setUserData(editData)

    setIsEdit(false)

  }

  // CANCEL EDIT
  const handleCancel = () => {

    setEditData(userData)

    setIsEdit(false)

  }

  return (

    <div className='max-w-4xl mx-auto px-4 py-8 font-sans'>

      {/* PROFILE SECTION */}

      <div className='bg-white rounded-lg shadow-md p-8'>

        {/* HEADER */}

        <div className='mb-6 pb-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>

          <div>

            <h1 className='text-3xl font-bold text-slate-900'>
              {editData.name || "User Account"}
            </h1>

            <p className='text-slate-500 mt-1'>
              {editData.email || "No Email Provided"}
            </p>

          </div>

          <div className='flex items-center gap-3 justify-end'>

            {
              isEdit && (

                <button
                  type='button'
                  onClick={handleCancel}
                  className='hidden sm:inline-flex px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition text-sm'
                >
                  Cancel
                </button>

              )
            }

            <button
              type='button'
              onClick={() =>
                isEdit
                  ? handleSave()
                  : setIsEdit(true)
              }
              className='w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors cursor-pointer text-sm shadow-sm'
            >
              {
                isEdit
                  ? 'Save Changes'
                  : 'Edit Profile'
              }
            </button>

          </div>

        </div>

        {/* FORM GRID */}

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

          {/* FULL NAME */}

          <div>

            <label className='block text-sm font-medium text-slate-600 mb-2'>
              Full Name
            </label>

            {
              isEdit ? (

                <input
                  type='text'
                  name='name'
                  value={editData.name}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm'
                />

              ) : (

                <p className='text-slate-900 font-medium h-10 flex items-center bg-slate-50 px-3 rounded-lg'>
                  {editData.name || "Not Specified"}
                </p>

              )
            }

          </div>

          {/* EMAIL */}

          <div>

            <label className='block text-sm font-medium text-slate-600 mb-2'>
              Email Address
            </label>

            <input
              type='email'
              name='email'
              value={editData.email}
              onChange={handleInputChange}
              disabled={!isEdit}
              className='w-full rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-blue-500 disabled:bg-slate-50'
            />

          </div>

          {/* PHONE */}

          <div>

            <label className='block text-sm font-medium text-slate-600 mb-2'>
              Phone Number
            </label>

            {
              isEdit ? (

                <input
                  type='text'
                  name='phone'
                  value={editData.phone}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm'
                />

              ) : (

                <p className='text-slate-900 font-medium h-10 flex items-center bg-slate-50 px-3 rounded-lg'>
                  {editData.phone || "Not Specified"}
                </p>

              )
            }

          </div>

          {/* GENDER */}

          <div>

            <label className='block text-sm font-medium text-slate-600 mb-2'>
              Gender
            </label>

            {
              isEdit ? (

                <select
                  name='gender'
                  value={editData.gender}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-sm'
                >

                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>

                </select>

              ) : (

                <p className='text-slate-900 font-medium h-10 flex items-center bg-slate-50 px-3 rounded-lg'>
                  {editData.gender}
                </p>

              )
            }

          </div>

          {/* DOB */}

          <div>

            <label className='block text-sm font-medium text-slate-600 mb-2'>
              Date of Birth
            </label>

            {
              isEdit ? (

                <input
                  type='date'
                  name='dob'
                  value={editData.dob}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm'
                />

              ) : (

                <p className='text-slate-900 font-medium h-10 flex items-center bg-slate-50 px-3 rounded-lg'>
                  {editData.dob}
                </p>

              )
            }

          </div>

          {/* ADDRESS 1 */}

          <div>

            <label className='block text-sm font-medium text-slate-600 mb-2'>
              Address Line 1
            </label>

            {
              isEdit ? (

                <input
                  type='text'
                  name='address.line1'
                  value={editData.address.line1}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm'
                />

              ) : (

                <p className='text-slate-900 font-medium h-10 flex items-center bg-slate-50 px-3 rounded-lg'>
                  {editData.address.line1 || "Not Specified"}
                </p>

              )
            }

          </div>

          {/* ADDRESS 2 */}

          <div>

            <label className='block text-sm font-medium text-slate-600 mb-2'>
              Address Line 2
            </label>

            {
              isEdit ? (

                <input
                  type='text'
                  name='address.line2'
                  value={editData.address.line2}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm'
                />

              ) : (

                <p className='text-slate-900 font-medium h-10 flex items-center bg-slate-50 px-3 rounded-lg'>
                  {editData.address.line2 || "Not Specified"}
                </p>

              )
            }

          </div>

        </div>

      </div>

    </div>

  )
}

export default MyProfile