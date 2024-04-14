import React from 'react';
import bag from '../assets/bag.png';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Form = () => {
  const dipatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    const age = e.target.ageGroup.value;
    const interest = e.target.Interests.value;
    console.log(age, interest);
    dipatch({type: 'SET_AGE', payload: age});
    dipatch({type: 'SET_INTEREST', payload: interest});
    navigate('/home');
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center sm:bg-indigo-500 sm:p-8">
        <img className="mx-auto h-1/2 w-auto" src={bag} alt="Your Company" />
      </div>
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Fill this form to get started
          </h2>

          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
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
                >
                  <option value="">Select Age Group</option>
                  <option value="18-25">18-25</option>
                  <option value="26-35">26-35</option>
                  <option value="36-50">36-50</option>
                </select>
              </div>
            </div>
            <div>
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Interests
                </label>
              </div>
              <div className="mt-2">
                <select
                  name="Interests"
                  className="border p-2 w-full"
                  required
                >
                  <option value="">Select Interests</option>
                  <option value="electronics">Electronics</option>
                  <option value="books">Books</option>
                  <option value="beauty">Beauty and Personal Care</option>
                </select>
              </div>

            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get Recommendations
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
