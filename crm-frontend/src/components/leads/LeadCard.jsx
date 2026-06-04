import React from 'react';

function LeadCard({lead,onSelect}) {

  return (

    <div
      className="card mb-2 p-3 shadow-sm"
      style={{cursor:"pointer"}}
      onClick={()=>onSelect(lead)}
    >

      <h6>{lead.name}</h6>

      <small>{lead.location}</small>

      <br/>

      <small>
        ₹ {lead.budget}
      </small>

      <br/>

      <span className="badge bg-primary">
        {lead.status}
      </span>

    </div>

  );
}

export default LeadCard;