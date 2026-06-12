
import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import Swal
from "sweetalert2";

import { cities }
from "../../data/cities";

import { areaMap }
from "../../data/areaMap";

function AgentForm({ loadAgents }) {

    const [managers, setManagers] = useState([]);

    const [agent, setAgent] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        location: "",
        assignedCity: "",
        assignedArea: "",
        assignedManagerId: "",
        role: "AGENT"
    });

    useEffect(() => {
        loadManagers();
    }, []);

    const loadManagers = async () => {

        const response =
            await UserService.getManagers();

        setManagers(response.data);
    };

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;
    
        if (
            name === "assignedCity"
        ) {
    
            setAgent({
    
                ...agent,
    
                assignedCity:
                value,
    
                assignedArea: ""
    
            });
    
            return;
        }
    
        setAgent({
    
            ...agent,
    
            [name]: value
    
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await UserService.addUser(agent);

            Swal.fire({

                icon: "success",
            
                title: "Success",
            
                text:
                "Agent Added Successfully",
            
                timer: 1500,
            
                showConfirmButton: false
            
            });

            setAgent({
                name: "",
                email: "",
                mobile: "",
                password: "",
                location: "",
                assignedCity: "",
                assignedArea: "",
                assignedManagerId: "",
                role: "AGENT"
            });
            if (loadAgents) {
                loadAgents();
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

        <div className="agent-form-card">

            <h4>Add Agent</h4>

            <form onSubmit={handleSubmit}
            autoComplete="off">

                <div className="row">

                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Agent Name"
                            value={agent.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email"
                            value={agent.email}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            name="mobile"
                            className="form-control"
                            placeholder="Mobile"
                            value={agent.mobile}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            value={agent.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            name="location"
                            className="form-control"
                            placeholder="Location"
                            value={agent.location}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                    <select
    name="assignedCity"
    className="form-select"
    value={agent.assignedCity}
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

                    <div className="col-md-6 mb-3">
                    <select
    name="assignedArea"
    className="form-select"
    value={agent.assignedArea}
    onChange={handleChange}
>

    <option value="">
        Select Area
    </option>

    {
        areaMap[
            agent.assignedCity
        ]?.map(area => (

            <option
                key={area}
                value={area}
            >
                {area}
            </option>

        ))
    }

</select>
                    </div>

                    <div className="col-md-6 mb-3">

                        <select
                            name="assignedManagerId"
                            className="form-select"
                            value={agent.assignedManagerId}
                            onChange={handleChange}
                        >

                            <option value="">
                                Select Manager
                            </option>

                            {
                                managers.map(
                                    (manager) => (

                                        <option
                                            key={manager.userId}
                                            value={manager.userId}
                                        >
                                            {manager.name}
                                        </option>

                                    )
                                )
                            }

                        </select>

                    </div>

                </div>

                <button
                    type="submit"
                    className="agent-btn"
                >
                    Add Agent
                </button>

            </form>

        </div>
    );
}

export default AgentForm;