import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserService from "../../services/UserService";
import LeadService from "../../services/LeadService";

function LeadDetails({
    lead,
    refreshLeads,
    clearLead,
    mode
}) {
 
    const [agents, setAgents] =
    useState([]);

const [selectedAgent,
    setSelectedAgent] =
    useState("");

    const [status, setStatus] =
        useState("");

        useEffect(() => {

            UserService.getAgents()
                .then((res) => {
        
                    setAgents(
                        res.data
                    );
        
                });
        
        }, []);

    useEffect(() => {

    if (lead) {

        setStatus(
            lead.status
        );

        setSelectedAgent(
            lead.assignedAgentId || ""
        );

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
                        Click any lead from
                        the left panel to
                        view complete details.
                    </p>

                </div>

            </div>

        );
    }

    const updateStatus =
        async () => {

            try {

                const leadId =
                    lead.leadid ||
                    lead.Leadid;

                const updatedLead = {

                    ...lead,

                    status

                };

                await LeadService.updateLead(
                    leadId,
                    updatedLead
                );

                toast.success(
                    "Lead Status Updated"
                );

                refreshLeads();

            } catch (error) {

                console.log(error);

                toast.error(
                    "Update Failed"
                );
            }
        };

    const deleteLead =
        async () => {

            const leadId =
                lead.leadid ||
                lead.Leadid;

            if (
                !window.confirm(
                    "Delete this Lead?"
                )
            ) {
                return;
            }

            try {

                await LeadService.deleteLead(
                    leadId
                );

                toast.success(
                    "Lead Deleted"
                );

                refreshLeads();

                if (clearLead) {

                    clearLead();

                }

            } catch (error) {

                console.log(error);

                toast.error(
                    "Delete Failed"
                );
            }
        };
        const assignLead =
    async () => {

        if(!selectedAgent){

            toast.error(
                "Select Agent"
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
            const updatedLead = {

                ...lead,
            
                assignedAgentId:
                    agent.userId,
            
                assignedAgentName:
                    agent.name,
            
                assignedArea:
                    agent.assignedArea,
            
                status: "CONTACTED"
            };
            await LeadService.updateLead(
    lead.leadid || lead.Leadid,
    updatedLead
);

            toast.success(
                `Lead Assigned To ${agent.name}`
            );

            refreshLeads();

        }

        catch(error){

            toast.error(
                "Assignment Failed"
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
                            {
                                lead.mobileNo ||
                                lead.mobile_no
                            }
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
            Assigned Agent
        </label>

        <p>

            {
                lead.assignedAgentName
                ||
                "Not Assigned"
            }

        </p>

    </div>

</div>

                <div className="col-md-6">

                    <div className="detail-item">

                        <label>
                            Property Type
                        </label>

                        <p>
                            {
                                lead.property_type
                            }
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
                            {lead.budget?.toLocaleString()}
                        </p>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="detail-item">

                        <label>
                            Created At
                        </label>

                        <p>
                            {
                                lead.createdAt
                                    ?
                                    new Date(
                                        lead.createdAt
                                    ).toLocaleDateString()
                                    :
                                    "-"
                            }
                        </p>

                    </div>

                </div>

            </div>

            {/* REQUIREMENT */}

            <div className="requirement-box">

                <h5>
                    Additional Requirement
                </h5>

                <p>
                    {
                        lead.Additional_requirement ||
                        "No Requirement Provided"
                    }
                </p>

            </div>
           

          

           

            {/* NEW LEADS */}

{
mode === "new" && (

<div className="mt-4">

    <h5 className="mb-3">
        Assign Lead To Agent
    </h5>

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
            agents.map(agent => (

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

    <button
        className="btn btn-warning mt-3 me-2"
        onClick={assignLead}
    >

        Assign Lead

    </button>

    <button
        className="btn btn-danger mt-3"
        onClick={deleteLead}
    >

        Delete Lead

    </button>

</div>

)
}

{/* ASSIGNED LEADS */}

{
mode === "assigned" && (

<div className="mt-4">

    <h5 className="mb-3">
        Update Lead Status
    </h5>

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

    <button
        className="btn btn-primary mt-3 me-2"
        onClick={updateStatus}
    >

        Update Status

    </button>

    <button
        className="btn btn-danger mt-3"
        onClick={deleteLead}
    >

        Delete Lead

    </button>

</div>

)
}

        </div>
    );
}

export default LeadDetails;