import LeadCard from "../leads/LeadCard";

function AssignedLeads({
    leads,
    onSelect
}) {

    const assignedLeads =
        leads.filter(
            lead =>
                lead.assignedAgentId ||
                lead.assignedAgentName
        );

    return (

        <div className="lead-list-container">

            <div className="lead-list-header">

                <h4>
                    Assigned Leads
                </h4>

                <div className="lead-count-badge">

                    {assignedLeads.length}

                </div>

            </div>

            {
                assignedLeads.length === 0 ?

                (
                    <p>
                        No Assigned Leads
                    </p>
                )

                :

                (
                    assignedLeads.map(
                        (lead) => (

                            <LeadCard
                                key={lead.leadid}
                                lead={lead}
                                onSelect={onSelect}
                            />

                        )
                    )
                )
            }

        </div>
    );
}

export default AssignedLeads;