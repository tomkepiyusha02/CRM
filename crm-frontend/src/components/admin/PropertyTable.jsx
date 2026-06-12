import React,
{
    useEffect,
    useState
}
from "react";

import PropertyService
from "../../services/PropertyService";
import Swal from "sweetalert2";

function PropertyTable() {

    const [properties, setProperties] =
        useState([]);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        loadProperties();

    }, []);

    const loadProperties = async () => {

        const response =
            await PropertyService.getAllProperties();

        setProperties(response.data);
    };

    const deleteProperty = async (id) => {

        Swal.fire({
            title: "Delete Property?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545"
        }).then(async (result) => {
    
            if(result.isConfirmed){
    
                await PropertyService.deleteProperty(id);
    
                Swal.fire(
                    "Deleted!",
                    "Property Removed",
                    "success"
                );
    
                loadProperties();
            }
        });
    };

    const filteredProperties =
        properties.filter((property) =>
            property.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (

        <div className="property-table-card">

            <div className="d-flex justify-content-between mb-3">

                <h4>Properties</h4>

                <input
                    type="text"
                    className="form-control property-search"
                    placeholder="Search Property"
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

            </div>

            <table className="table table-hover">

                <thead>

                    <tr>

                        <th>Name</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        filteredProperties.map(
                            (property) => (

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

                                        <span
                                            className={`status-badge ${property.propertyStatus.toLowerCase()}`}
                                        >
                                            {
                                                property.propertyStatus
                                            }
                                        </span>

                                    </td>

                                    <td>

                                        <button
                                            className="property-delete-btn"
                                            onClick={() =>
                                                deleteProperty(
                                                    property.propertyId
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            )
                        )
                    }

                </tbody>

            </table>

        </div>

    );
}

export default PropertyTable;