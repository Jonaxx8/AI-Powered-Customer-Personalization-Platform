import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    birthdate: '',
    email: '',
    phone: '',
    address: '',
    ageGroup: '',
    interests: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(formData.interests);
   
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
                value={formData.firstName}
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
                value={formData.lastName}
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
            value={formData.gender}
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
          Birthdate:
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </label>

        <label>
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </label>



        <label>
          Address Line 1:
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </label>

        <label>
          Address Line 2:
          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </label>

        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </label>

        <label>
          State/Province:
          <select
            name="stateProvince"
            value={formData.stateProvince}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="">Select State/Province</option>
            { }
            <option value="state1">State 1</option>
            <option value="state2">State 2</option>
            { }
          </select>
        </label>

        <label>
          ZIP/Postal Code:
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </label>

        <label>
          Country:
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="">Select Country</option>
            { }
            <option value="country1">Country 1</option>
            <option value="country2">Country 2</option>
            { }
          </select>
        </label>




        <label>
          Age Group:
          <select
            name="ageGroup"
            value={formData.ageGroup}
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
            value={formData.interests}
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
