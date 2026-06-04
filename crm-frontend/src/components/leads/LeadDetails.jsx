import React from 'react';

function LeadDetails({lead}) {

 if(!lead) {
   return <h4>Select Lead</h4>;
 }

 return (

  <div className="card p-4">

    <h3>{lead.name}</h3>

    <p>Email : {lead.email}</p>

    <p>Mobile : {lead.mobile_no}</p>

    <p>Location : {lead.location}</p>

    <p>Property : {lead.property_type}</p>

    <p>Budget : ₹ {lead.budget}</p>

    <p>
      Requirement :
      {lead.additional_requirement}
    </p>

    <p>Status : {lead.status}</p>

  </div>

 );

}

export default LeadDetails;