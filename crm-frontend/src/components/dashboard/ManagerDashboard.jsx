import React,
{
 useEffect,
 useState
}
from 'react';

import LeadService from '../../services/LeadService';

import NewLeads from '../leads/NewLeads';
import AssignedLeads from '../leads/AssignedLeads';
import LeadDetails from '../leads/LeadDetails';

function ManagerDashboard() {

 const [leads,setLeads] = useState([]);
 const [selected,setSelected] = useState(null);

 useEffect(()=>{

   loadLeads();

 },[]);

 const loadLeads=()=>{

   LeadService.getAllLeads()
   .then(res=>{

      setLeads(res.data);

   });

 }

 const newCount =

 leads.filter(
 lead => lead.status==="NEW"
 ).length;

 return (

  <div className="container-fluid">

   <div className="alert alert-warning mt-3">

      🔔 {newCount} New Leads

   </div>

   <div className="row">

      <div className="col-md-4">

         <NewLeads
            leads={leads}
            onSelect={setSelected}
         />

         <hr/>

         <AssignedLeads
            leads={leads}
            onSelect={setSelected}
         />

      </div>

      <div className="col-md-8">

         <LeadDetails
            lead={selected}
         />

      </div>

   </div>

  </div>

 );

}

export default ManagerDashboard;