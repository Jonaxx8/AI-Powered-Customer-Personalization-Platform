import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';

const Form = () => {
  const { userData, updateUserData } = useUserContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(userData);
   
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-8 bg-lime-50 shadow-md rounded font-sans">
      <h2 className="text-2xl font-bold mb-4 ">User Information Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div> 
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </label>
          </div>
          <div>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </label>
          </div>
        </div>

        <label>
          Gender:
          <select
            name="gender"
            value={userData.gender}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          Age Group:
          <select
            name="ageGroup"
            value={userData.ageGroup}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="">Select Age Group</option>
            <option value="18-25">18-25</option>
            <option value="26-35">26-35</option>
            <option value="36-50">36-50</option>
            <option value="51+">51+</option>
          </select>
        </label>

        <label>
          Interests:
          <select
            name="interests"
            value={userData.interests}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="">Select Interests</option>
            <option value="smartphones">Smartphones</option>
            <option value="laptops">Laptops</option>
            <option value="audio">Audio Devices</option>
            <option value="wearables">Wearable Devices</option>
            <option value="cameras">Cameras</option>
            <option value="gaming">Gaming Consoles and Accessories</option>
            <option value="home-automation">Home Automation</option>
            <option value="accessories">Electronic Accessories</option>
            { }
          </select>

        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
