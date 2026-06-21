import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import Swal from "sweetalert2";
import { locationMap } from "../data/locationMap";
import { areaMap } from "../data/areaMap";
import "../styles/AgentRegisterPage.css";
function AgentRegisterPage() {

    const navigate = useNavigate();

    const [agent, setAgent] = useState({

        name: "",
        email: "",
        mobile: "",
        password: "",
        location: "",
        assignedCity: "",
        assignedArea: ""

    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "location") {

            setAgent({

                ...agent,

                location: value,

                assignedCity: "",

                assignedArea: ""

            });

            return;
        }

        if (name === "assignedCity") {

            setAgent({

                ...agent,

                assignedCity: value,

                assignedArea: ""

            });

            return;
        }

        setAgent({

            ...agent,

            [name]: value

        });
    };

    const register = async (e) => {

        e.preventDefault();

        try {

            await UserService.registerAgent(agent);

            Swal.fire(
                "Success",
                "Request Sent To Admin",
                "success"
            );

            navigate("/");

        } catch (error) {

            Swal.fire(
                "Error",
                "Registration Failed",
                "error"
            );
        }
    };

    return (

        <div className="agent-register-page">

            <div className="agent-form-card">

            <div className="agent-register-header">

<div className="agent-register-icon">
    👨‍💼
</div>

<div>

    <h2>
        Agent Registration
    </h2>

    <p>
        Register as a Real Estate Agent
    </p>

</div>

</div>
                <form onSubmit={register}>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Full Name"
                                name="name"
                                value={agent.name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email Address"
                                name="email"
                                value={agent.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Mobile Number"
                                name="mobile"
                                value={agent.mobile}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="password"
                                value={agent.password}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        {/* State */}

                        <div className="col-md-4 mb-3">

                            <select
                                name="location"
                                className="form-select"
                                value={agent.location}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select State
                                </option>

                                {
                                    Object.keys(locationMap)
                                        .map(state => (

                                            <option
                                                key={state}
                                                value={state}
                                            >
                                                {state}
                                            </option>

                                        ))
                                }

                            </select>

                        </div>

                        {/* City */}

                        <div className="col-md-4 mb-3">

                            <select
                                name="assignedCity"
                                className="form-select"
                                value={agent.assignedCity}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select City
                                </option>

                                {
                                   locationMap[
                                        agent.location
                                    ]?.map(city => (

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

                        {/* Area */}

                        <div className="col-md-4 mb-3">

                            <select
                                name="assignedArea"
                                className="form-select"
                                value={agent.assignedArea}
                                onChange={handleChange}
                                required
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

                    </div>

                    <button
    type="submit"
    className="agent-btn"
>
    Submit Registration Request
</button>

                </form>

            </div>

        </div>

    );
}

export default AgentRegisterPage;