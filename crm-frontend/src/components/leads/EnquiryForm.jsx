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

  const validate = () => {

    let temp = {};

    if (!formData.name.trim()) {
      temp.name = "Name is required";
    }
    else if (formData.name.length < 3) {
      temp.name = "Minimum 3 characters required";
    }

    if (!formData.email.trim()) {
      temp.email = "Email is required";
    }
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email
      )
    ) {
      temp.email = "Invalid Email";
    }

    if (!formData.mobile_no.trim()) {
      temp.mobile_no = "Mobile Number is required";
    }
    else if (
      !/^[0-9]{10}$/.test(
        formData.mobile_no
      )
    ) {
      temp.mobile_no = "Enter valid 10 digit number";
    }

    if (!formData.location.trim()) {
      temp.location = "Location required";
    }

    if (!formData.property_type.trim()) {
      temp.property_type = "Select property type";
    }

    if (!formData.budget) {
      temp.budget = "Budget required";
    }

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {

      await LeadService.addLead(formData);

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

    } catch (error) {

      alert("Something went wrong");

      console.log(error);

    }
  };

  return (

    <div className="card enquiry-card">

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          <div className="row">

            {/* Name */}

            <div className="col-md-6 mb-3">

              <label>Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-control ${
                  errors.name
                    ? "is-invalid"
                    : ""
                }`}
              />

              <div className="invalid-feedback">
                {errors.name}
              </div>

            </div>

            {/* Email */}

            <div className="col-md-6 mb-3">

              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-control ${
                  errors.email
                    ? "is-invalid"
                    : ""
                }`}
              />

              <div className="invalid-feedback">
                {errors.email}
              </div>

            </div>

            {/* Mobile */}

            <div className="col-md-6 mb-3">

              <label>Mobile Number</label>

              <input
                type="text"
                name="mobile_no"
                value={formData.mobile_no}
                onChange={handleChange}
                className={`form-control ${
                  errors.mobile_no
                    ? "is-invalid"
                    : ""
                }`}
              />

              <div className="invalid-feedback">
                {errors.mobile_no}
              </div>

            </div>

            {/* Location */}

            <div className="col-md-6 mb-3">

              <label>Location</label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`form-control ${
                  errors.location
                    ? "is-invalid"
                    : ""
                }`}
              />

              <div className="invalid-feedback">
                {errors.location}
              </div>

            </div>

            {/* Property Type */}

            <div className="col-md-6 mb-3">

              <label>Property Type</label>

              <select
                name="property_type"
                value={formData.property_type}
                onChange={handleChange}
                className={`form-select ${
                  errors.property_type
                    ? "is-invalid"
                    : ""
                }`}
              >

                <option value="">
                  Select Property
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

              <div className="invalid-feedback">
                {errors.property_type}
              </div>

            </div>

            {/* Budget */}

            <div className="col-md-6 mb-3">

              <label>Budget</label>

              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={`form-control ${
                  errors.budget
                    ? "is-invalid"
                    : ""
                }`}
              />

              <div className="invalid-feedback">
                {errors.budget}
              </div>

            </div>

            {/* Requirement */}

            <div className="col-md-12 mb-3">

              <label>
                Additional Requirement
              </label>

              <textarea
                rows="4"
                name="Additional_requirement"
                value={
                  formData.Additional_requirement
                }
                onChange={handleChange}
                className="form-control"
              />

            </div>

          </div>

          <button
 type="submit"
 className="btn-submit"
>
 Submit Enquiry
</button>

        </form>

      </div>

    </div>
  );
}

export default EnquiryForm;