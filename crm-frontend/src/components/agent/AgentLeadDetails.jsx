import React,
{
    useState
}
from "react";

import { toast }
from "react-toastify";

import LeadService
from "../../services/LeadService";

function AgentLeadDetails({

    lead,

    refreshLeads

}) {

    const [status,
        setStatus] =
        useState(
            lead?.status || ""
        );

    if(!lead){

        return (

            <div className="details-card empty-details">

                <div className="text-center">

                    <i
                        className="bi bi-person-lines-fill empty-icon"
                    ></i>

                    <h3>
                        Select a Lead
                    </h3>

                    <p>
                        Choose a lead
                        from the left panel
                    </p>

                </div>

            </div>

        );
    }

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
                    "Lead Updated"
                );

                refreshLeads();

            }

            catch(error){

                toast.error(
                    "Update Failed"
                );

            }
        };

    return (

        <div className="details-card">

            {/* HEADER */}

            <div className="lead-profile-header">

                <img
                    src={`https://ui-avatars.com/api/?name=${lead.name}&background=4f46e5&color=fff`}
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

                        <label>
                            Email
                        </label>

                        <p>
                            {lead.email}
                        </p>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="detail-item">

                        <label>
                            Mobile
                        </label>

                        <p>
                            {lead.mobileNo}
                        </p>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="detail-item">

                        <label>
                            Location
                        </label>

                        <p>
                            {lead.location}
                        </p>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="detail-item">

                        <label>
                            Property Type
                        </label>

                        <p>
                            {lead.property_type}
                        </p>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="detail-item">

                        <label>
                            Budget
                        </label>

                        <p>
                            ₹
                            {" "}
                            {
                                lead.budget?.toLocaleString()
                            }
                        </p>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="detail-item">

                        <label>
                            Assigned Agent
                        </label>

                        <p>
                            {
                                lead.assignedAgentName
                            }
                        </p>

                    </div>

                </div>

            </div>

            {/* REQUIREMENT */}

            <div className="requirement-box">

                <h5>
                    Customer Requirement
                </h5>

                <p>
                    {
                        lead.Additional_requirement
                    }
                </p>

            </div>

            {/* STATUS UPDATE */}

            <div className="mt-4">

                <label
                    className="fw-bold"
                >
                    Update Status
                </label>

                <select
                    className="form-select mt-2"
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

                    <option value="SITE_VISIT">
                        SITE VISIT
                    </option>

                    <option value="BOOKING">
                        BOOKING
                    </option>

                    <option value="CLOSED">
                        CLOSED
                    </option>

                </select>

                <button
                    className="btn btn-primary mt-3"
                    onClick={
                        updateStatus
                    }
                >
                    Update Status
                </button>

            </div>

        </div>

    );

}

export default AgentLeadDetails;