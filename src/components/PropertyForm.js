import React, { useState } from "react";

const PropertyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    area: "",
    bedrooms: "",
    bathrooms: "",
    location: "",
    age: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { area, bedrooms, bathrooms, location, age } = formData;

    if (!area || !bedrooms || !bathrooms || !location || !age) {
      return "All fields are required.";
    }

    if (area <= 0 || bedrooms <= 0 || bathrooms <= 0 || age < 0) {
      return "All numerical values must be positive.";
    }

    if (![1, 2, 3].includes(Number(location))) {
      return "Location must be 1, 2, or 3.";
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card shadow-lg p-4 border-0"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <h3 className="mb-4 text-center text-primary">🏡 Property Details</h3>

      {error && (
        <div className="alert alert-danger text-center">
          {error}
        </div>
      )}

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Area (sq ft):</label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Bedrooms:</label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Bathrooms:</label>
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Location (1, 2, 3):</label>
          <input
            type="number"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label">Age of Property:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="btn btn-success w-100 fw-bold"
        >
          🔮 Predict Price
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;
