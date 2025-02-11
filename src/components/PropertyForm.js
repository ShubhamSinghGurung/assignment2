import React, { useState } from "react";

const PropertyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    area: "",
    bedrooms: "",
    bathrooms: "",
    location: "",
    age: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
      <label>Area (sq ft):</label>
      <input type="number" name="area" onChange={handleChange} required />

      <label>Bedrooms:</label>
      <input type="number" name="bedrooms" onChange={handleChange} required />

      <label>Bathrooms:</label>
      <input type="number" name="bathrooms" onChange={handleChange} required />

      <label>Location (1, 2, 3...):</label>
      <input type="number" name="location" onChange={handleChange} required />

      <label>Age of Property:</label>
      <input type="number" name="age" onChange={handleChange} required />

      <button type="submit">Predict Price</button>
    </form>
  );
};

export default PropertyForm;
