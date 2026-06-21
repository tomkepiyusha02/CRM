import LeadCard from "../leads/LeadCard";

function NewLeads({ leads, onSelect }) {

    const newLeads = leads.filter(
        (lead) =>
            !lead.assignedAgentId &&
            !lead.assignedAgentName
    );

    return (

        <div className="lead-list-container">

            <div className="lead-list-header">

                <div>

                    <h4>
                        New Leads
                    </h4>

                    <p>
                        Incoming leads waiting for assignment
                    </p>

                </div>

                <div className="lead-count-badge">

                    {newLeads.length}

                </div>

            </div>

            {
                newLeads.length === 0 ? (

                    <div className="empty-state">

                        <i className="bi bi-inbox"></i>

                        <h5>
                            No New Leads
                        </h5>

                        <p>
                            All leads have been assigned.
                        </p>

                    </div>

                ) : (

                    <div className="lead-card-wrapper">

                        {
                            newLeads.map((lead) => (

                                <LeadCard
                                    key={lead.leadid}
                                    lead={lead}
                                    onSelect={onSelect}
                                />

                            ))
                        }

                    </div>

                )
            }

        </div>

    );
}

export default NewLeads;