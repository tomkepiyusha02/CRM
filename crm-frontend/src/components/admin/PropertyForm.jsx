import React, { useState } from "react";
import PropertyService from "../../services/PropertyService";
import Swal from "sweetalert2";

function PropertyForm({ loadProperties }) {

    const [property, setProperty] = useState({
        name: "",
        price: "",
        type: "APARTMENT",
        location: "",
        areaSqft: "",
        builderName: "",
        propertyStatus: "AVAILABLE",
        description: ""
    });

    const handleChange = (e) => {

        setProperty({
            ...property,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await PropertyService.addProperty(property);

            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Property Added Successfully",
                timer: 1500,
                showConfirmButton: false
            });

            setProperty({
                name: "",
                price: "",
                type: "APARTMENT",
                location: "",
                areaSqft: "",
                builderName: "",
                propertyStatus: "AVAILABLE",
                description: ""
            });

            if(loadProperties){
                loadProperties();
            }

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error Adding Property"
            });
        }
    };

    return (

        <div className="property-form-card">

            <h4>Add Property</h4>

            <form onSubmit={handleSubmit}>

                <div className="row">

                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Property Name"
                            value={property.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <input
                            type="number"
                            name="price"
                            className="form-control"
                            placeholder="Price"
                            value={property.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">

                        <select
                            name="type"
                            className="form-select"
                            value={property.type}
                            onChange={handleChange}
                        >
                            <option value="APARTMENT">
                                Apartment
                            </option>

                            <option value="VILLA">
                                Villa
                            </option>

                            <option value="PLOT">
                                Plot
                            </option>

                            <option value="COMMERCIAL">
                                Commercial
                            </option>

                        </select>

                    </div>

                    <div className="col-md-6 mb-3">

                        <input
                            type="text"
                            name="location"
                            className="form-control"
                            placeholder="Location"
                            value={property.location}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <input
                            type="number"
                            name="areaSqft"
                            className="form-control"
                            placeholder="Area Sqft"
                            value={property.areaSqft}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <input
                            type="text"
                            name="builderName"
                            className="form-control"
                            placeholder="Builder Name"
                            value={property.builderName}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <select
                            name="propertyStatus"
                            className="form-select"
                            value={property.propertyStatus}
                            onChange={handleChange}
                        >

                            <option value="AVAILABLE">
                                Available
                            </option>

                            <option value="BOOKED">
                                Booked
                            </option>

                            <option value="SOLD">
                                Sold
                            </option>

                        </select>

                    </div>

                    <div className="col-md-12 mb-3">

                        <textarea
                            rows="4"
                            name="description"
                            className="form-control"
                            placeholder="Property Description"
                            value={property.description}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <button
                    type="submit"
                    className="property-btn"
                >
                    Add Property
                </button>

            </form>

        </div>
    );
}

export default PropertyForm;