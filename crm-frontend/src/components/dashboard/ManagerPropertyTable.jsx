import React, {
    useEffect,
    useState
}
from "react";

import PropertyService
from "../../services/PropertyService";

import "../../styles/Property.css";

import Swal
from "sweetalert2";

function ManagerPropertyTable() {

    const [properties,
        setProperties] =
        useState([]);

    const [search,
        setSearch] =
        useState("");

    useEffect(() => {

        loadProperties();

    }, []);

    const loadProperties =
        async () => {

            try {

                const response =
                    await PropertyService
                        .getAllProperties();

                const city =
                    localStorage.getItem(
                        "assignedCity"
                    );

                const cityProperties =
                    response.data.filter(
                        property =>
                            property.location === city
                    );

                setProperties(
                    cityProperties
                );

            }

            catch(error){

                console.log(error);
            }
        };

    const viewProperty =
        (property) => {

            Swal.fire({

                title:
                    property.name,

                html: `

                <div style="text-align:left">

                    <p>
                    <b>Type:</b>
                    ${property.type}
                    </p>

                    <p>
                    <b>Price:</b>
                    ₹ ${property.price}
                    </p>

                    <p>
                    <b>Location:</b>
                    ${property.location}
                    </p>

                    <p>
                    <b>Area:</b>
                    ${property.areaSqft} Sqft
                    </p>

                    <p>
                    <b>Builder:</b>
                    ${property.builderName}
                    </p>

                    <p>
                    <b>Status:</b>
                    ${property.propertyStatus}
                    </p>

                    <p>
                    <b>Description:</b>
                    ${property.description}
                    </p>

                </div>

                `,

                width:700
            });
        };

    const viewImage =
        (property) => {

            if(!property.imageUrl){

                Swal.fire(
                    "No Image Available"
                );

                return;
            }

            Swal.fire({

                title:
                    property.name,

                imageUrl:
                    property.imageUrl,

                imageWidth:
                    700

            });
        };

    const openMap =
        (property) => {

            if(
                property.latitude &&
                property.longitude
            ){

                window.open(

                    `https://www.google.com/maps?q=${property.latitude},${property.longitude}`,

                    "_blank"
                );

            }else{

                Swal.fire(
                    "Location Not Available"
                );
            }
        };

        const updatePropertyStatus = async (
            propertyId,
            status
        ) => {
        
            try {
        
                await PropertyService.updatePropertyStatus(
                    propertyId,
                    status
                );
        
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Property status updated"
                });
        
                loadProperties();
        
            } catch (error) {
        
                Swal.fire({
                    icon: "error",
                    title: "Failed",
                    text: "Unable to update property status"
                });
        
            }
        
        };

    const filteredProperties =
        properties.filter(
            property => {

                const txt =
                    search.toLowerCase();

                return (

                    property.name
                    ?.toLowerCase()
                    .includes(txt)

                    ||

                    property.location
                    ?.toLowerCase()
                    .includes(txt)

                    ||

                    property.builderName
                    ?.toLowerCase()
                    .includes(txt)

                    ||

                    property.type
                    ?.toLowerCase()
                    .includes(txt)

                );
            }
        );

    return (

        <div className="manager-property-container">
<div className="property-hero">

<div className="hero-left">

    <div className="hero-icon">
        🏢
    </div>

    <div>

        <h2 className="hero-title">
            My City Properties
        </h2>

        <p className="hero-subtitle">
            Manage all properties available in

            <strong>
                {" "}
                {localStorage.getItem("assignedCity")}
            </strong>

        </p>

    </div>

</div>

</div>

<div className="property-stats-row">

<div className="property-stat-card">

    <div className="stat-icon purple">
        <i className="bi bi-grid"></i>
    </div>

    <div>
        <h6>Total</h6>
        <h3>{filteredProperties.length}</h3>
    </div>

</div>

<div className="property-stat-card">

    <div className="stat-icon green">
        <i className="bi bi-check-lg"></i>
    </div>

    <div>
        <h6>Available</h6>
        <h3>
            {
                filteredProperties.filter(
                    p =>
                    p.propertyStatus === "AVAILABLE"
                ).length
            }
        </h3>
    </div>

</div>

<div className="property-stat-card">

    <div className="stat-icon red">
        <i className="bi bi-cart"></i>
    </div>

    <div>
        <h6>Sold</h6>
        <h3>
            {
                filteredProperties.filter(
                    p =>
                    p.propertyStatus === "SOLD"
                ).length
            }
        </h3>
    </div>

</div>

<div className="property-stat-card">

    <div className="stat-icon blue">
        <i className="bi bi-hammer"></i>
    </div>

    <div>

        <h6>
            Under Construction
        </h6>

        <h3>
            {
                filteredProperties.filter(
                    p =>
                    p.propertyStatus ===
                    "UNDER_CONSTRUCTION"
                ).length
            }
        </h3>

    </div>

</div>

<div className="property-stat-card">

    <div className="stat-icon orange">
        <i className="bi bi-bookmark"></i>
    </div>

    <div>
        <h6>Booked</h6>
        <h3>
            {
                filteredProperties.filter(
                    p =>
                    p.propertyStatus === "Booked"
                ).length
            }
        </h3>
    </div>

</div>

</div>

<div className="search-wrapper">

    <div className="search-box">

        <i className="bi bi-search"></i>

        <input
            type="text"
            placeholder="Search Property..."
            value={search}
            onChange={(e) =>
                setSearch(e.target.value)
            }
        />

    </div>

</div>

            <div className="table-wrapper">

<table className="table property-table">

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Type</th>

                            <th>Price</th>

                            <th>Location</th>

                            <th>Property Status</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            filteredProperties.map(
                                property => (

                                    <tr
                                        key={
                                            property.propertyId
                                        }
                                    >

                                        <td>
                                            {property.name}
                                        </td>

                                        <td>
                                            {property.type}
                                        </td>

                                        <td>
                                            ₹ {property.price}
                                        </td>

                                        <td>
                                            {property.location}
                                        </td>
                                        <td>

<div className="d-flex align-items-center gap-2">

<span
className={`badge ${
property.propertyStatus === "AVAILABLE"
? "bg-success"
: property.propertyStatus === "BOOKED"
? "bg-warning"
: property.propertyStatus === "SOLD"
? "bg-danger"
: "bg-primary"
}`}
>
{property.propertyStatus}
</span>

<select
className="form-select form-select-sm"
style={{ width: "180px" }}
value={property.propertyStatus}
onChange={(e) =>
updatePropertyStatus(
property.propertyId,
e.target.value
)
}
>
<option value="AVAILABLE">AVAILABLE</option>
<option value="BOOKED">BOOKED</option>
<option value="SOLD">SOLD</option>
<option value="UNDER_CONSTRUCTION">
UNDER CONSTRUCTION
</option>
</select>

</div>

</td>

                                        <td>

                                            <button
                                                className="btn btn-info btn-sm me-2"
                                                onClick={() =>
                                                    viewProperty(
                                                        property
                                                    )
                                                }
                                            >
                                                <i className="bi bi-eye"></i>
                                            </button>

                                            <button
                                                className="btn btn-primary btn-sm me-2"
                                                onClick={() =>
                                                    viewImage(
                                                        property
                                                    )
                                                }
                                            >
                                                <i className="bi bi-image"></i>
                                            </button>

                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() =>
                                                    openMap(
                                                        property
                                                    )
                                                }
                                            >
                                                <i className="bi bi-geo-alt-fill"></i>
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )
                        }

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default ManagerPropertyTable;