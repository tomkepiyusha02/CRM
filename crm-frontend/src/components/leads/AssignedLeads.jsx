import React from 'react';
import LeadCard from './LeadCard';

function AssignedLeads({leads,onSelect}) {

 const assigned =

 leads.filter(
 lead => lead.status !== "NEW"
 );

 return (

  <div>

   <h4>Assigned Leads</h4>

   {
    assigned.map(lead => (

      <LeadCard
        key={lead.leadid}
        lead={lead}
        onSelect={onSelect}
      />

    ))
   }

  </div>

 );

}

export default AssignedLeads;