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

import ManagerPropertyTable from "../dashboard/ManagerPropertyTable";
import ManagerAgentTable from "./ManagerAgentTable";

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
const city =
    localStorage.getItem(
        "assignedCity"
    );

LeadService.getLeadsByCity(city)
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

    const agentMap = {};

leads.forEach((lead) => {

    const agent =
        lead.assignedAgentName ||
        "Unassigned";

    agentMap[agent] =
        (agentMap[agent] || 0) + 1;
});

const agentData =
Object.keys(agentMap).map(
    (agent) => ({
        agent,
        leads: agentMap[agent]
    })
);

const propertyMap = {};

leads.forEach((lead) => {

    const type =
        lead.property_type ||
        "Unknown";

    propertyMap[type] =
        (propertyMap[type] || 0) + 1;
});

const propertyData =
Object.keys(propertyMap).map(
    (type) => ({
        type,
        count: propertyMap[type]
    })
);

const areaMap = {};

leads.forEach((lead) => {

    const area =
        lead.assignedArea ||
        "Unknown";

    areaMap[area] =
        (areaMap[area] || 0) + 1;
});

const areaData =
Object.keys(areaMap).map(
    (area) => ({
        area,
        leads: areaMap[area]
    })
);

    return (

        <div className="container-fluid manager-dashboard">

            {/* DASHBOARD */}

            {
                activeTab ===
                "dashboard" && (
<>
    {/* Hero Banner */}

    <div className="lead-page-header dashboard-header">

    <div>

        <h2>
            👋 Welcome,
            {" "}
            {localStorage.getItem("name")}
        </h2>

        <p>
            Here's what's happening in your area today.
        </p>

    </div>

    <div className="city-badge">

        📍 {localStorage.getItem("assignedCity")}

    </div>

</div>

    {/* KPI CARDS */}

    <div className="dashboard-cards">

    <div className="modern-card total">

        <div className="card-icon purple">
            <i className="bi bi-people-fill"></i>
        </div>

        <div>

            <h3>{leads.length}</h3>

            <p>Total Leads</p>

        </div>

    </div>

    <div className="modern-card new">

        <div className="card-icon red">
            <i className="bi bi-person-plus-fill"></i>
        </div>

        <div>

            <h3>{newLeadCount}</h3>

            <p>New Leads</p>

        </div>

    </div>

    <div className="modern-card interested">

        <div className="card-icon green">
            <i className="bi bi-hand-thumbs-up-fill"></i>
        </div>

        <div>

            <h3>{interestedCount}</h3>

            <p>Interested</p>

        </div>

    </div>

    <div className="modern-card booking">

        <div className="card-icon orange">
            <i className="bi bi-calendar-check-fill"></i>
        </div>

        <div>

            <h3>{bookingCount}</h3>

            <p>Bookings</p>

        </div>

    </div>

</div>

    

    {/* RECENT LEADS */}

    <div className="chart-card">

    <div className="table-title">

<i className="bi bi-file-earmark-text"></i>

<h5>
    Recent Leads
</h5>

</div>

        <table className="table">

            <thead>

                <tr>

                    <th>Name</th>

                    <th>Location</th>

                    <th>Status</th>

                </tr>

            </thead>

            <tbody>

                {
                    leads
                    .slice(0,5)
                    .map(
                        lead => (

                            <tr
                                key={
                                    lead.leadid
                                }
                            >

                                <td>
                                    {lead.name}
                                </td>

                                <td>
                                    {
                                        lead.location
                                    }
                                </td>

                                <td>

                                    <span
                                        className={
                                            `badge bg-primary`
                                        }
                                    >

                                        {
                                            lead.status
                                        }

                                    </span>

                                </td>

                            </tr>

                        )
                    )
                }

            </tbody>

        </table>

    </div>
</>

                )
            }

            {/* NEW LEADS */}

            {
activeTab === "new" && (

<>
    {/* HEADER */}

    <div className="lead-page-header">

        <div>

            <h2>
                🔔 New Leads
            </h2>

            <p>
                Manage incoming leads waiting for assignment
            </p>

        </div>

        <div className="city-badge">

            📍 {localStorage.getItem("assignedCity")}

        </div>

    </div>

    {/* SEARCH */}

    <div className="search-container">

        <i className="bi bi-search"></i>

        <input
            type="text"
            className="search-input"
            placeholder="Search New Lead..."
            value={search}
            onChange={(e)=>
                setSearch(e.target.value)
            }
        />

    </div>

    <div className="row">

        <div className="col-lg-4">

            <div className="lead-sidebar">

                <NewLeads
                    leads={filteredLeads}
                    onSelect={setSelectedLead}
                />

            </div>

        </div>

        <div className="col-lg-8">

        <LeadDetails
    lead={selectedLead}
    refreshLeads={loadLeads}
    clearLead={() =>
        setSelectedLead(null)
    }
    mode="new"
/>

        </div>

    </div>

</>

)
}

            {/* ASSIGNED LEADS */}
            {
activeTab === "assigned" && (

<>
    <div className="lead-page-header">

        <div>

            <h2>
                👨‍💼 Assigned Leads
            </h2>

            <p>
                View and manage assigned customer leads
            </p>

        </div>

        <div className="city-badge">

            📍 {localStorage.getItem("assignedCity")}

        </div>

    </div>

    <div className="search-container">

        <i className="bi bi-search"></i>

        <input
            type="text"
            className="search-input"
            placeholder="Search Assigned Lead..."
            value={search}
            onChange={(e)=>
                setSearch(e.target.value)
            }
        />

    </div>

    <div className="row">

        <div className="col-lg-4">

            <div className="lead-sidebar">

                <AssignedLeads
                    leads={filteredLeads}
                    onSelect={setSelectedLead}
                />

            </div>

        </div>

        <div className="col-lg-8">

        <LeadDetails
    lead={selectedLead}
    refreshLeads={loadLeads}
    clearLead={() =>
        setSelectedLead(null)
    }
    mode="assigned"
/>

        </div>

    </div>

</>

)
}

            {/* PROPERTIES */}

{
    activeTab === "properties" && (

        <ManagerPropertyTable />

    )
}

{
    activeTab === "agents" && (

        <>

            <div className="lead-page-header">

                <div>

                    <h2>
                        👨‍💼 Agents
                    </h2>

                    <p>
                        Agent performance and workload
                    </p>

                </div>

                <div className="city-badge">

                    📍
                    {localStorage.getItem(
                        "assignedCity"
                    )}

                </div>

            </div>

            <ManagerAgentTable />

        </>

    )
}

    {/* STATISTICS */}

   {/* STATISTICS */}

{
activeTab === "stats" && (

<>

<div className="lead-page-header">

    <div>

        <h2>
            📊 CRM Analytics Dashboard
        </h2>

        <p>
            Performance, Lead Flow & Agent Insights
        </p>

    </div>

    <div className="city-badge">

        📍 {localStorage.getItem("assignedCity")}

    </div>

</div>

<div className="row">

    {/* Lead Status */}

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
                                (entry,index) => (

                                    <Cell
                                        key={index}
                                        fill={COLORS[index]}
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

    {/* Location */}

    <div className="col-lg-6 mb-4">

        <div className="chart-card">

            <h5>
                Leads By Location
            </h5>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <BarChart data={locationData}>

                    <XAxis dataKey="city" />

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

    {/* Budget */}

    <div className="col-lg-6 mb-4">

        <div className="chart-card">

            <h5>
                Budget Distribution
            </h5>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <BarChart data={budgetData}>

                    <XAxis dataKey="range" />

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

    {/* Agent Performance */}

    <div className="col-lg-6 mb-4">

        <div className="chart-card">

            <h5>
                Agent Performance
            </h5>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <BarChart data={agentData}>

                    <XAxis dataKey="agent" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="leads"
                        fill="#6366f1"
                        radius={[10,10,0,0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    </div>

    {/* Property Type */}

    <div className="col-lg-6 mb-4">

        <div className="chart-card">

            <h5>
                Property Type Interest
            </h5>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <PieChart>

                    <Pie
                        data={propertyData}
                        dataKey="count"
                        nameKey="type"
                        outerRadius={120}
                        label
                    />

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    </div>

    {/* Conversion */}

    <div className="col-lg-6 mb-4">

        <div className="chart-card">

            <h5>
                Lead Conversion Funnel
            </h5>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <BarChart data={chartData}>

                    <XAxis dataKey="name" />

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

    {/* Area Wise */}

    <div className="col-lg-12">

        <div className="chart-card">

            <h5>
                Area Wise Lead Distribution
            </h5>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <BarChart data={areaData}>

                    <XAxis dataKey="area" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="leads"
                        fill="#8b5cf6"
                        radius={[10,10,0,0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    </div>


</div>

</>

)
}

</div>
    );
}

export default ManagerDashboard;