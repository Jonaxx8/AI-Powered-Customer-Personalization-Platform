import React from 'react'
import './Dropdown.scss'
import { useDispatch } from 'react-redux';


const Dropdown = ({onClose}) => {
  const dipatch = useDispatch();


  const handleChangeAgeGroup = (e) => {
    console.log(e.target.value);
    dipatch({ type: 'SET_AGE', payload: e.target.value });
  }

  const handleChangeInterests = (e) => {
    console.log(e.target.value);
    dipatch({ type: 'SET_INTEREST', payload: e.target.value });
  }
  return (
    <div className='p-dropdown'>
      <div className='p-dropdown__content'>
        <div className='p-dropdown__content__header p-4'>
          <h1 className='text-2xl'>Preferences</h1>
        </div>
        <div className='p-dropdown__content__body p-4'>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Age
            </label>
          </div>
          <div className="mt-2">
            <select
              name="ageGroup"
              className="border p-2 w-full focus:ring-indigo-600"
              required
              onChange={handleChangeAgeGroup}
            >
              <option value="">Select Age Group</option>
              <option value="18-25">18-25</option>
              <option value="26-35">26-35</option>
              <option value="36-50">36-50</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Interests
            </label>
          </div>
          <div className="mt-2">
            <select
              name="Interests"
              className="border p-2 w-full"
              onChange={handleChangeInterests}
              required
            >
              <option value="">Select Interests</option>
              <option value="electronics">Electronics</option>
              <option value="books">Books</option>
              <option value="beauty">Beauty and Personal Care</option>
            </select>
          </div>
          <div className='mt-4'>
            <button
              onClick={onClose}
              className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold p-3 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dropdown