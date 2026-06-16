
import React, { useState } from "react";
import UserService from "../../services/UserService";
import Swal from "sweetalert2";

import { cities }
from "../../data/cities";

function ManagerForm({ loadManagers }) {

    const [manager, setManager] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        location: "",
        assignedCity: "",
        role: "MANAGER"
    });

    const handleChange = (e) => {

        setManager({
            ...manager,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await UserService.addUser(manager);

            Swal.fire({

                icon: "success",
            
                title: "Success",
            
                text:
                "Manager Added Successfully",
            
                timer: 1500,
            
                showConfirmButton: false
            
            });

            setManager({
                name: "",
                email: "",
                mobile: "",
                password: "",
                location: "",
                assignedCity: "",
                role: "MANAGER"
            });

            if (loadManagers) {
                loadManagers();
            }

        } catch (error) {

            Swal.fire({

                icon: "error",
            
                title: "Error",
            
                text:
                error.response?.data
                || "Something Went Wrong"
            
            });
        }
    };

    return (


        <div className="manager-form-card">

            <h4>Add Manager</h4>
            

            <form onSubmit={handleSubmit}
            autoComplete="off">

                <div className="row">

                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            name="name"
                            placeholder="Manager Name"
                            className="form-control"
                            value={manager.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="form-control"
                            value={manager.email}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            name="mobile"
                            placeholder="Mobile"
                            className="form-control"
                            value={manager.mobile}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="form-control"
                            value={manager.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            className="form-control"
                            value={manager.location}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                    <select
    name="assignedCity"
    className="form-select"
    value={manager.assignedCity}
    onChange={handleChange}
>

    <option value="">
        Select City
    </option>

    {
        cities.map(city => (

            <option
                key={city}
                value={city}
            >
                {city}
            </option>

        ))
    }

</select>
                    </div>

                </div>

                <button
                    className="manager-btn"
                    type="submit"
                >
                    Add Manager
                </button>

            </form>

        </div>
    );
}

export default ManagerForm;