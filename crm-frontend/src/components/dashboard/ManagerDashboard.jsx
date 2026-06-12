import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import LeadService from "../../services/LeadService";

import NewLeads from "./NewLeads";
import AssignedLeads from "./AssignedLeads";
import LeadDetails from "../leads/LeadDetails";


function ManagerDashboard() {

    const [leads, setLeads] = useState([]);
    const [selectedLead, setSelectedLead] = useState(null);

    const [search, setSearch] = useState("");
    const [previousCount, setPreviousCount] = useState(0);

    useEffect(() => {

        loadLeads();

        const interval = setInterval(() => {
            loadLeads();
        }, 10000);

        return () => clearInterval(interval);

    }, []);

    const loadLeads = () => {

        LeadService.getAllLeads()
            .then((res) => {

                const allLeads = res.data;

                setLeads(allLeads);

                const currentCount =
                    allLeads.filter(
                        lead => lead.status === "NEW"
                    ).length;

                if (
                    previousCount > 0 &&
                    currentCount > previousCount
                ) {
                    toast.info("🔔 New Lead Arrived");
                }

                setPreviousCount(currentCount);

            })
            .catch((err) => {
                console.log(err);
            });
    };

    const filteredLeads = leads.filter(
        lead =>
            lead.name
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    const newLeadCount =
        leads.filter(
            lead => lead.status === "NEW"
        ).length;

    const assignedLeadCount =
        leads.filter(
            lead => lead.status !== "NEW"
        ).length;

    return (

        <div className="container-fluid mt-4">
            <div className="card shadow-sm mb-4">

{/* <div className="card-body">

    <h4>
        Welcome,
        {localStorage.getItem("name")}
    </h4>

    <p className="mb-0">
        Manage Assigned Leads and Follow Ups
    </p>

</div> */}

</div>

            {/* Statistics Cards */}

            <div className="row mb-4">

                <div className="col-md-4">

                    <div className="stat-card">

                        <h3>
                            {leads.length}
                        </h3>

                        <p>Total Leads</p>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="stat-card stat-new">

                        <h3>
                            {newLeadCount}
                        </h3>

                        <p>New Leads</p>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="stat-card stat-assigned">

                        <h3>
                            {assignedLeadCount}
                        </h3>

                        <p>Assigned Leads</p>

                    </div>

                </div>

            </div>

            {/* Search */}

            <div className="mb-3">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Search Lead By Name..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>

            {/* Notification */}

            <div className="alert alert-warning">

                🔔 {newLeadCount} New Leads

            </div>

            <div className="row">

                <div className="col-md-4">

                    <div className="lead-sidebar">

                        <NewLeads
                            leads={filteredLeads}
                            onSelect={setSelectedLead}
                        />

                        <AssignedLeads
                            leads={filteredLeads}
                            onSelect={setSelectedLead}
                        />

                    </div>

                </div>

                <div className="col-md-8">

                    <LeadDetails
                        lead={selectedLead}
                        refreshLeads={loadLeads}
                        clearLead={() =>
                            setSelectedLead(null)
                        }
                    />

                </div>

            </div>

        </div>
    );
}

export default ManagerDashboard;