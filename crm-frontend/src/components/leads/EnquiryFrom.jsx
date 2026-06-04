import React, { useState } from "react";
import LeadService from "../../services/LeadService";

function EnquiryForm() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_no: "",
    location: "",
    property_type: "",
    budget: "",
    Additional_requirement: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const validateForm = () => {

    let newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Minimum 3 characters required";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email
      )
    ) {
      newErrors.email = "Invalid email format";
    }

    // Mobile
    if (!formData.mobile_no.trim()) {
      newErrors.mobile_no = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile_no)) {
      newErrors.mobile_no = "Mobile must be 10 digits";
    }

    // Location
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    // Property Type
    if (!formData.property_type.trim()) {
      newErrors.property_type = "Property type is required";
    }

    // Budget
    if (!formData.budget) {
      newErrors.budget = "Budget is required";
    } else if (formData.budget <= 0) {
      newErrors.budget = "Budget must be greater than 0";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    LeadService.addLead(formData)
      .then(() => {

        alert("Enquiry Submitted Successfully");

        setFormData({
          name: "",
          email: "",
          mobile_no: "",
          location: "",
          property_type: "",
          budget: "",
          Additional_requirement: ""
        });

      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (

    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="mb-4">
          Property Enquiry Form
        </h2>

        <form onSubmit={handleSubmit}>

          {/* Name */}

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />

          {errors.name && (
            <small className="text-danger">
              {errors.name}
            </small>
          )}

          <br />

          {/* Email */}

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && (
            <small className="text-danger">
              {errors.email}
            </small>
          )}

          <br />

          {/* Mobile */}

          <input
            type="text"
            name="mobile_no"
            placeholder="Enter Mobile Number"
            className="form-control"
            value={formData.mobile_no}
            onChange={handleChange}
          />

          {errors.mobile_no && (
            <small className="text-danger">
              {errors.mobile_no}
            </small>
          )}

          <br />

          {/* Location */}

          <input
            type="text"
            name="location"
            placeholder="Enter Location"
            className="form-control"
            value={formData.location}
            onChange={handleChange}
          />

          {errors.location && (
            <small className="text-danger">
              {errors.location}
            </small>
          )}

          <br />

          {/* Property Type */}

          <select
            name="property_type"
            className="form-control"
            value={formData.property_type}
            onChange={handleChange}
          >
            <option value="">
              Select Property Type
            </option>

            <option value="1 BHK">
              1 BHK
            </option>

            <option value="2 BHK">
              2 BHK
            </option>

            <option value="3 BHK">
              3 BHK
            </option>

            <option value="Villa">
              Villa
            </option>

            <option value="Plot">
              Plot
            </option>
          </select>

          {errors.property_type && (
            <small className="text-danger">
              {errors.property_type}
            </small>
          )}

          <br />

          {/* Budget */}

          <input
            type="number"
            name="budget"
            placeholder="Enter Budget"
            className="form-control"
            value={formData.budget}
            onChange={handleChange}
          />

          {errors.budget && (
            <small className="text-danger">
              {errors.budget}
            </small>
          )}

          <br />

          {/* Additional Requirement */}

          <textarea
            name="Additional_requirement"
            rows="4"
            placeholder="Additional Requirement"
            className="form-control"
            value={formData.Additional_requirement}
            onChange={handleChange}
          />

          <br />

          <button
            className="btn btn-primary w-100"
            type="submit"
          >
            Submit Enquiry
          </button>

        </form>

      </div>

    </div>
  );
}

export default EnquiryForm;