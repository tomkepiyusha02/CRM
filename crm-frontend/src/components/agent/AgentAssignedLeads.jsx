import React from "react";

function AgentAssignedLeads({
    leads,
    onSelect
}) {

    if(!leads.length){

        return (

            <div className="lead-list-container">

                <div className="empty-state">

                    <i className="bi bi-person-x"></i>

                    <h5>
                        No Assigned Leads
                    </h5>

                </div>

            </div>

        );
    }

    return (

        <div className="lead-list-container">

            <div className="lead-list-header">

                <div>

                    <h4>
                        My Leads
                    </h4>

                    <p>
                        Assigned Customer Leads
                    </p>

                </div>

                <div
                    className="lead-count-badge"
                >
                    {leads.length}
                </div>

            </div>

            <div
                className="lead-card-wrapper"
            >

                {
                    leads.map(
                        (lead)=>(

                            <div
                                key={
                                    lead.leadid
                                }
                                className="lead-card"
                                onClick={() =>
                                    onSelect(
                                        lead
                                    )
                                }
                            >

                                <div>

                                    <h6>
                                        {
                                            lead.name
                                        }
                                    </h6>

                                    <small>
                                        {
                                            lead.location
                                        }
                                    </small>

                                    <br/>

                                    <small>
                                        ₹
                                        {
                                            lead.budget?.toLocaleString()
                                        }
                                    </small>

                                </div>

                                <span
                                    className={`lead-status-badge ${lead.status}`}
                                >
                                    {
                                        lead.status
                                    }
                                </span>

                            </div>

                        )
                    )
                }

            </div>

        </div>

    );
}

export default AgentAssignedLeads;