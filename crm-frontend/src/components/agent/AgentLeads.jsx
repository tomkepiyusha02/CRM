import React,
{
    useEffect,
    useState
}
from "react";

import LeadService
from "../../services/LeadService";

import AgentLeadDetails
from "./AgentLeadDetails";

function AgentLeads() {

    const [leads,
        setLeads] =
        useState([]);

    const [selectedLead,
        setSelectedLead] =
        useState(null);

    const [search,
        setSearch] =
        useState("");

    useEffect(() => {

        loadLeads();

    }, []);

    const loadLeads =
        async () => {

            try {

                const userId =
                    localStorage.getItem(
                        "userId"
                    );

                const response =
                    await LeadService
                        .getAssignedLeads(
                            userId
                        );

                setLeads(
                    response.data
                );

            }

            catch(error){

                console.log(error);

            }
        };

    const filteredLeads =
        leads.filter(
            lead =>
                lead.name
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (

        <>

            <div className="lead-page-header">

                <div>

                    <h2>
                        👨‍💼 My Leads
                    </h2>

                    <p>
                        Manage your assigned leads
                    </p>

                </div>

            </div>

            <div className="search-container">

                <input
                    type="text"
                    className="search-input"
                    placeholder="Search Lead..."
                    value={search}
                    onChange={(e)=>
                        setSearch(
                            e.target.value
                        )
                    }
                />

            </div>

            <div className="row">

                <div className="col-lg-4">

                    <div className="lead-sidebar">

                        {
                            filteredLeads.map(
                                lead => (

                                    <div
                                        key={
                                            lead.leadid
                                        }
                                        className="lead-card"
                                        onClick={() =>
                                            setSelectedLead(
                                                lead
                                            )
                                        }
                                    >

                                        <h6>
                                            {lead.name}
                                        </h6>

                                        <small>
                                            {
                                                lead.location
                                            }
                                        </small>

                                        <br />

                                        <span
                                            className={`lead-status-badge ${lead.status}`}
                                        >

                                            {lead.status}

                                        </span>

                                    </div>

                                )
                            )
                        }

                    </div>

                </div>

                <div className="col-lg-8">

                    <AgentLeadDetails
                        lead={selectedLead}
                        refreshLeads={
                            loadLeads
                        }
                    />

                </div>

            </div>

        </>

    );
}

export default AgentLeads;