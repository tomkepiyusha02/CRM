import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import UserService from "../../services/UserService";
import LeadService from "../../services/LeadService";
import PropertyService from "../../services/PropertyService";

function LeadDetails({
    lead,
    refreshLeads,
    clearLead,
    mode
}) {

    const [agents, setAgents] = useState([]);

    const [properties, setProperties] = useState([]);

    const [selectedAgent, setSelectedAgent] =
        useState("");

    const [selectedProperty, setSelectedProperty] =
        useState("");


    const [status, setStatus] =
        useState("");

    /* -------------------- LOAD AGENTS -------------------- */

    useEffect(() => {

        loadAgents();

    }, []);

    const loadAgents = async () => {

    try {

        const managerId =
            localStorage.getItem("userId");

        const res =
            await UserService.getAgentsByManager(
                managerId
            );

        setAgents(res.data);

    }
    catch (err) {

        console.log(err);

    }

};

    /* -------------------- LOAD PROPERTIES WHEN AGENT CHANGES -------------------- */

    useEffect(() => {

    if (selectedAgent && lead) {

        loadAvailableProperties();

    }

}, [selectedAgent]);

const loadAvailableProperties = async () => {

    try {

        let response;

        // Load properties based on lead location
        response =
            await PropertyService.getByLocation(
                lead.location
            );

        // Show only AVAILABLE properties
        const availableProperties =
            response.data.filter(
                property =>
                    property.propertyStatus ===
                    "AVAILABLE"
            );

        setProperties(
            availableProperties
        );

    }

    catch (err) {

        console.log(err);

    }

};


    /* -------------------- LOAD SELECTED LEAD -------------------- */

    useEffect(() => {

        if (lead) {

            setStatus(
                lead.status
            );

            setSelectedAgent(
                lead.assignedAgentId || ""
            );

            setSelectedProperty("");

            

        }

    }, [lead]);

    if (!lead) {

        return (

            <div className="details-card empty-details">

                <div className="text-center">

                    <i className="bi bi-person-lines-fill empty-icon"></i>

                    <h3>
                        Select a Lead
                    </h3>

                    <p>
                        Click any lead from the left panel
                        to view complete details.
                    </p>

                </div>

            </div>

        );

    }

 

    /* -------------------- ASSIGN LEAD -------------------- */

const assignLead = async () => {

    if (!selectedAgent) {

        toast.error(
            "Please Select Agent"
        );

        return;

    }

    if (!selectedProperty) {

        toast.error(
            "Please Select Property"
        );

        return;

    }

    const agent =
        agents.find(
            a =>
                a.userId ===
                selectedAgent
        );

    try {

        // 1. Assign Property To Agent

        await PropertyService.assignProperty({

            agentId:
                selectedAgent,

            propertyId:
                selectedProperty

        });

       
        // 3. Assign Lead

        const updatedLead = {

            ...lead,

            assignedAgentId:
                agent.userId,

            assignedAgentName:
                agent.name,

            assignedArea:
                agent.assignedArea,

            status:
                "CONTACTED"

        };

        await LeadService.updateLead(

            lead.leadid,

            updatedLead

        );

        toast.success(
            "Lead Assigned Successfully"
        );

        refreshLeads();

        if (clearLead) {

            clearLead();

        }

    }

    catch (error) {

        console.log(error);

        toast.error(
            "Assignment Failed"
        );

    }

};

    /* -------------------- UPDATE STATUS -------------------- */

    const updateStatus =
        async () => {

            try {

                const updatedLead = {

                    ...lead,

                    status

                };

                await LeadService
                    .updateLead(

                        lead.leadid,

                        updatedLead

                    );

                toast.success(
                    "Status Updated"
                );

                refreshLeads();

            }

            catch (error) {

                toast.error(
                    "Update Failed"
                );

            }

        };

    /* -------------------- DELETE LEAD -------------------- */

    const deleteLead =
        async () => {

            if (

                !window.confirm(
                    "Delete Lead ?"
                )

            ) {

                return;

            }

            try {

                await LeadService
                    .deleteLead(

                        lead.leadid

                    );

                toast.success(
                    "Lead Deleted"
                );

                refreshLeads();

                if (clearLead) {

                    clearLead();

                }

            }

            catch (error) {

                toast.error(
                    "Delete Failed"
                );

            }

        };

    return (

<div className="details-card">

    {/* HEADER */}

    <div className="lead-profile-header">

        <img
            src={`https://ui-avatars.com/api/?name=${lead.name}&background=4f46e5&color=fff&size=150`}
            alt=""
            className="lead-avatar"
        />

        <div>

            <h2>
                {lead.name}
            </h2>

            <span
                className={`lead-status-badge ${lead.status}`}
            >
                {lead.status}
            </span>

        </div>

    </div>

    <hr />

    {/* DETAILS */}

    <div className="row">

        <div className="col-md-6">

            <div className="detail-item">

                <label>Email</label>

                <p>{lead.email}</p>

            </div>

        </div>

        <div className="col-md-6">

            <div className="detail-item">

                <label>Mobile</label>

                <p>{lead.mobileNo}</p>

            </div>

        </div>

        <div className="col-md-6">

            <div className="detail-item">

                <label>Location</label>

                <p>{lead.location}</p>

            </div>

        </div>

        <div className="col-md-6">

            <div className="detail-item">

                <label>Assigned Agent</label>

                <p>

                    {

                        lead.assignedAgentName ||

                        "Not Assigned"

                    }

                </p>

            </div>

        </div>

        <div className="col-md-6">

            <div className="detail-item">

                <label>Property Type</label>

                <p>{lead.property_type}</p>

            </div>

        </div>

        <div className="col-md-6">

            <div className="detail-item">

                <label>Budget</label>

                <p>

                    ₹ {lead.budget?.toLocaleString()}

                </p>

            </div>

        </div>

    </div>

    <div className="requirement-box mt-4">

        <h5>

            Additional Requirement

        </h5>

        <p>

            {

                lead.Additional_requirement ||

                "No Requirement"

            }

        </p>

    </div>

    {/* ========================= */}

    {/* NEW LEAD SECTION */}

    {/* ========================= */}

    {

        mode === "new" && (

            <>

                <hr />

                <h4>

                    Assign Lead

                </h4>

                {/* Agent */}

                <div className="mb-3">

                    <label>

                        Select Agent

                    </label>

                    <select

                        className="form-select"

                        value={selectedAgent}

                        onChange={(e)=>

                            setSelectedAgent(

                                e.target.value

                            )

                        }

                    >

                        <option value="">

                            Select Agent

                        </option>

                        {

                            agents.map(agent=>(

                                <option

                                    key={agent.userId}

                                    value={agent.userId}

                                >

                                    {agent.name}

                                    {" - "}

                                    {agent.assignedArea}

                                </option>

                            ))

                        }

                    </select>

                </div>

                {/* Property */}

                <div className="mb-3">

                    <label>

                        Select Property

                    </label>

                    <select

                        className="form-select"

                        value={selectedProperty}

                        onChange={(e)=>

                            setSelectedProperty(

                                e.target.value

                            )

                        }

                    >

                        <option value="">

                            Select Property

                        </option>

                        {

                            properties.map(property=>(

                                <option

                                    key={property.propertyId}

                                    value={property.propertyId}

                                >

                                    {property.name}

                                    {" | "}

                                    {property.location}

                                    {" | ₹"}

                                    {property.price}

                                </option>

                            ))

                        }

                    </select>

                </div>

                <div className="d-flex gap-2">

    <button
        className="btn btn-success"
        onClick={assignLead}
    >
        Assign Lead
    </button>

    <button
        className="btn btn-danger"
        onClick={deleteLead}
    >
        Delete
    </button>

</div>

            </>

        )

    }

    {/* ========================= */}

    {/* ASSIGNED LEADS */}

    {/* ========================= */}

    {

        mode === "assigned" && (

            <>

                <hr />

                <h4>

                    Update Status

                </h4>

                <select

                    className="form-select"

                    value={status}

                    onChange={(e)=>

                        setStatus(

                            e.target.value

                        )

                    }

                >

                    <option value="CONTACTED">

                        CONTACTED

                    </option>

                    <option value="INTERESTED">

                        INTERESTED

                    </option>

                    <option value="BOOKING">

                        BOOKING

                    </option>

                    <option value="CLOSED">

                        CLOSED

                    </option>

                </select>

                <div className="mt-3">

                    <button

                        className="btn btn-primary me-2"

                        onClick={updateStatus}

                    >

                        Update Status

                    </button>

                    <button

                        className="btn btn-danger"

                        onClick={deleteLead}

                    >

                        Delete Lead

                    </button>

                </div>

            </>

        )

    }

</div>

);
}
export default LeadDetails;