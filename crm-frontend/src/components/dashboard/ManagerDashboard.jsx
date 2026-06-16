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

                const allLeads =
                    res.data;

                setLeads(allLeads);

                const currentCount =
                    allLeads.filter(
                        lead =>
                            lead.status ===
                            "NEW"
                    ).length;

                if (
                    previousCount > 0 &&
                    currentCount >
                    previousCount
                ) {

                    toast.info(
                        "🔔 New Lead Arrived"
                    );
                }

                setPreviousCount(
                    currentCount
                );

            })

            .catch((err) => {

                console.log(err);

            });
    };

    const filteredLeads =
        leads.filter((lead) =>
            lead.name
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    const newLeadCount =
        leads.filter(
            lead =>
                lead.status ===
                "NEW"
        ).length;

    const contactedCount =
        leads.filter(
            lead =>
                lead.status ===
                "CONTACTED"
        ).length;

    const interestedCount =
        leads.filter(
            lead =>
                lead.status ===
                "INTERESTED"
        ).length;

    const bookingCount =
        leads.filter(
            lead =>
                lead.status ===
                "BOOKING"
        ).length;

    return (

        <div className="container-fluid manager-dashboard">

            {/* HEADER */}

            <div className="manager-header">

                <div>

                    <h2>
                        👋 Welcome,
                        {" "}
                        {
                            localStorage.getItem(
                                "name"
                            )
                        }
                    </h2>

                    <p>
                        Manage Leads,
                        Follow-Ups and
                        Customer Conversions
                    </p>

                </div>

            </div>

            {/* STATS */}

            <div className="row mb-4">

                <div className="col-lg-3 col-md-6 mb-3">

                    <div className="manager-stat total">

                        <h2>
                            {leads.length}
                        </h2>

                        <p>
                            Total Leads
                        </p>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6 mb-3">

                    <div className="manager-stat new">

                        <h2>
                            {newLeadCount}
                        </h2>

                        <p>
                            New Leads
                        </p>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6 mb-3">

                    <div className="manager-stat interested">

                        <h2>
                            {interestedCount}
                        </h2>

                        <p>
                            Interested
                        </p>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6 mb-3">

                    <div className="manager-stat booking">

                        <h2>
                            {bookingCount}
                        </h2>

                        <p>
                            Booking
                        </p>

                    </div>

                </div>

            </div>

            {/* LEAD SUMMARY */}

            <div className="lead-summary">

                <div>
                    🟡 Contacted:
                    {" "}
                    {contactedCount}
                </div>

                <div>
                    🟢 Interested:
                    {" "}
                    {interestedCount}
                </div>

                <div>
                    🤝 Booking:
                    {" "}
                    {bookingCount}
                </div>

            </div>

            {/* SEARCH */}

            <div className="search-section">

                <input
                    type="text"
                    className="form-control search-input"
                    placeholder="🔍 Search Lead By Name..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

            </div>

            {/* ALERT */}

            <div className="new-lead-alert">

                🔔 You currently have
                {" "}
                <strong>
                    {newLeadCount}
                </strong>
                {" "}
                new leads waiting
                for follow-up

            </div>

            {/* MAIN LAYOUT */}

            <div className="row">

                {/* LEFT */}

                <div className="col-lg-3">

                    <div className="lead-sidebar">

                        <NewLeads
                            leads={filteredLeads}
                            onSelect={
                                setSelectedLead
                            }
                        />

                        <AssignedLeads
                            leads={filteredLeads}
                            onSelect={
                                setSelectedLead
                            }
                        />

                    </div>

                </div>

                {/* RIGHT */}

                <div className="col-lg-9">

                    <LeadDetails
                        lead={selectedLead}
                        refreshLeads={
                            loadLeads
                        }
                        clearLead={() =>
                            setSelectedLead(
                                null
                            )
                        }
                    />

                </div>

            </div>

        </div>
    );
}

export default ManagerDashboard;