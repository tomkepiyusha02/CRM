import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    LineChart,
    Line
} from "recharts";

import LeadService from "../../services/LeadService";

import NewLeads from "./NewLeads";
import AssignedLeads from "./AssignedLeads";
import LeadDetails from "../leads/LeadDetails";

function ManagerDashboard({
    activeTab
}) {

    const [leads, setLeads] =
        useState([]);

    const [selectedLead,
        setSelectedLead] =
        useState(null);

    const [search,
        setSearch] =
        useState("");

    const [previousCount,
        setPreviousCount] =
        useState(0);

    useEffect(() => {

        loadLeads();

        const interval =
            setInterval(() => {

                loadLeads();

            }, 10000);

        return () =>
            clearInterval(interval);

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
        leads.filter(
            lead =>
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

    const chartData = [

        {
            name: "NEW",
            value: newLeadCount
        },

        {
            name: "CONTACTED",
            value: contactedCount
        },

        {
            name: "INTERESTED",
            value: interestedCount
        },

        {
            name: "BOOKING",
            value: bookingCount
        }

    ];

    const COLORS = [

        "#ef4444",
        "#3b82f6",
        "#10b981",
        "#f59e0b"

    ];
    const budgetData = [

    {
        range: "0-20L",
        count: leads.filter(
            l => l.budget <= 2000000
        ).length
    },

    {
        range: "20-50L",
        count: leads.filter(
            l =>
                l.budget > 2000000 &&
                l.budget <= 5000000
        ).length
    },

    {
        range: "50L-1Cr",
        count: leads.filter(
            l =>
                l.budget > 5000000 &&
                l.budget <= 10000000
        ).length
    },

    {
        range: "1Cr+",
        count: leads.filter(
            l => l.budget > 10000000
        ).length
    }

];

const locationMap = {};

leads.forEach(lead => {

    const city =
        lead.location || "Unknown";

    locationMap[city] =
        (locationMap[city] || 0) + 1;

});

const locationData =
    Object.keys(locationMap).map(
        city => ({

            city,

            leads:
                locationMap[city]

        })
    );

    return (

        <div className="container-fluid manager-dashboard">

            {/* DASHBOARD */}

            {
                activeTab ===
                "dashboard" && (

                    <>

                        <div
                            className="manager-header"
                        >

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
                                Follow-ups &
                                Customer Conversion

                            </p>

                        </div>

                        <div className="row">

                            <div className="col-md-3">

                                <div
                                    className="manager-stat total"
                                >

                                    <h2>
                                        {leads.length}
                                    </h2>

                                    <p>
                                        Total Leads
                                    </p>

                                </div>

                            </div>

                            <div className="col-md-3">

                                <div
                                    className="manager-stat new"
                                >

                                    <h2>
                                        {newLeadCount}
                                    </h2>

                                    <p>
                                        New Leads
                                    </p>

                                </div>

                            </div>

                            <div className="col-md-3">

                                <div
                                    className="manager-stat interested"
                                >

                                    <h2>
                                        {
                                            interestedCount
                                        }
                                    </h2>

                                    <p>
                                        Interested
                                    </p>

                                </div>

                            </div>

                            <div className="col-md-3">

                                <div
                                    className="manager-stat booking"
                                >

                                    <h2>
                                        {
                                            bookingCount
                                        }
                                    </h2>

                                    <p>
                                        Booking
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div
                            className="dashboard-highlight"
                        >

                            <h4>
                                📢 Today's Highlights
                            </h4>

                            <ul>

                                <li>
                                    {
                                        newLeadCount
                                    }
                                    {" "}
                                    New Leads waiting
                                    for action
                                </li>

                                <li>
                                    {
                                        contactedCount
                                    }
                                    {" "}
                                    Leads contacted
                                </li>

                                <li>
                                    {
                                        interestedCount
                                    }
                                    {" "}
                                    Interested prospects
                                </li>

                                <li>
                                    {
                                        bookingCount
                                    }
                                    {" "}
                                    Booking opportunities
                                </li>

                            </ul>

                        </div>

                    </>

                )
            }

            {/* NEW LEADS */}

            {
                activeTab ===
                "new" && (

                    <>

                        <div
                            className="mb-3"
                        >

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search New Lead..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="row">

                            <div className="col-lg-4">

                                <div
                                    className="lead-sidebar"
                                >

                                    <NewLeads
                                        leads={
                                            filteredLeads
                                        }
                                        onSelect={
                                            setSelectedLead
                                        }
                                    />

                                </div>

                            </div>

                            <div className="col-lg-8">

                                <LeadDetails
                                    lead={
                                        selectedLead
                                    }
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

                    </>

                )
            }

            {/* ASSIGNED LEADS */}

            {
                activeTab ===
                "assigned" && (

                    <>

                        <div
                            className="mb-3"
                        >

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Assigned Lead..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="row">

                            <div className="col-lg-4">

                                <div
                                    className="lead-sidebar"
                                >

                                    <AssignedLeads
                                        leads={
                                            filteredLeads
                                        }
                                        onSelect={
                                            setSelectedLead
                                        }
                                    />

                                </div>

                            </div>

                            <div className="col-lg-8">

                                <LeadDetails
                                    lead={
                                        selectedLead
                                    }
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

                    </>

                )
            }

    {/* STATISTICS */}

{
activeTab === "stats" && (

<div className="row">

    {/* PIE */}

    <div className="col-lg-6 mb-4">

        <div className="chart-card">

            <h5>
                Lead Status Overview
            </h5>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <PieChart>

                    <Pie
                        data={chartData}
                        dataKey="value"
                        outerRadius={120}
                        label
                    >

                        {
                            chartData.map(
                                (
                                    entry,
                                    index
                                ) => (

                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[index]
                                        }
                                    />

                                )
                            )
                        }

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    </div>

    {/* STATUS BAR */}

    <div className="col-lg-6 mb-4">

        <div className="chart-card">

            <h5>
                Lead Pipeline
            </h5>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <BarChart
                    data={chartData}
                >

                    <XAxis
                        dataKey="name"
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="value"
                        fill="#4f46e5"
                        radius={[10,10,0,0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    </div>

    {/* BUDGET */}

    <div className="col-lg-6 mb-4">

        <div className="chart-card">

            <h5>
                Budget Distribution
            </h5>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <BarChart
                    data={budgetData}
                >

                    <XAxis
                        dataKey="range"
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="count"
                        fill="#10b981"
                        radius={[10,10,0,0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    </div>

    {/* LOCATION */}

    <div className="col-lg-6 mb-4">

        <div className="chart-card">

            <h5>
                Leads By Location
            </h5>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <BarChart
                    data={locationData}
                >

                    <XAxis
                        dataKey="city"
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="leads"
                        fill="#f59e0b"
                        radius={[10,10,0,0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    </div>

    {/* TREND */}

    <div className="col-lg-12">

        <div className="chart-card">

            <h5>
                Lead Conversion Trend
            </h5>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <LineChart
                    data={chartData}
                >

                    <XAxis
                        dataKey="name"
                    />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#4f46e5"
                        strokeWidth={4}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    </div>

</div>

)
}

        </div>
    );
}

export default ManagerDashboard;