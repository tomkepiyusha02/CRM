import React from 'react';
import LeadCard from './LeadCard';

function NewLeads({leads,onSelect}) {

 const newLeads =
 leads.filter(
 lead => lead.status === "NEW"
 );

 return (

  <div>

   <h4>New Leads</h4>

   {
    newLeads.map(lead => (

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

export default NewLeads;