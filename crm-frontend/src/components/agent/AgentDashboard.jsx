import React, {
    useEffect,
    useState
} from "react";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis
} from "recharts";

import FollowUpService from "../../services/FollowUpService";

import SiteVisitService from "../../services/SiteVisitService";

import LeadService from "../../services/LeadService";

function AgentDashboard() {

    const [followUps,
        setFollowUps] =
        useState([]);

    const [visits,
        setVisits] =
        useState([]);

    const [leads,
        setLeads] =
        useState([]);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard =
        async () => {

            try {

                const userId =
                    localStorage.getItem(
                        "userId"
                    );

                const leadResponse =
                    await LeadService
                        .getAssignedLeads(
                            userId
                        );

                setLeads(
                    leadResponse.data
                );

                const followUpResponse =
                    await FollowUpService
                        .getByAgent(
                            userId
                        );

                setFollowUps(
                    followUpResponse.data
                );

                const visitResponse =
                    await SiteVisitService
                        .getByAgent(
                            userId
                        );

                setVisits(
                    visitResponse.data
                );

            }

            catch(error){

                console.log(error);

            }
            

        };

    const chartData = [

        {
            name: "Assigned Leads",
            value: leads.length
        },

        {
            name: "Follow Ups",
            value: followUps.length
        },

        {
            name: "Site Visits",
            value: visits.length
        }

    ];

    const COLORS = [

        "#4f46e5",
        "#10b981",
        "#f59e0b"

    ];

    return (

        <div>

            {/* HEADER */}

            <div className="lead-page-header dashboard-header">

                <div>

                    <h2>
                        👨‍💼 Welcome,
                        {" "}
                        {localStorage.getItem(
                            "name"
                        )}
                    </h2>

                    <p>
                        Manage Leads,
                        Follow Ups &
                        Site Visits
                    </p>

                </div>

                <div className="city-badge">

                    📍
                    {
                        localStorage.getItem(
                            "assignedCity"
                        )
                    }

                </div>

            </div>

            {/* KPI CARDS */}

            <div className="dashboard-cards">

                <div className="modern-card total">

                    <div className="card-icon purple">

                        <i className="bi bi-people-fill"></i>

                    </div>

                    <div>

                        <h3>
                            {leads.length}
                        </h3>

                        <p>
                            Assigned Leads
                        </p>

                    </div>

                </div>

                <div className="modern-card interested">

                    <div className="card-icon green">

                        <i className="bi bi-telephone-fill"></i>

                    </div>

                    <div>

                        <h3>
                            {followUps.length}
                        </h3>

                        <p>
                            Follow Ups
                        </p>

                    </div>

                </div>

                <div className="modern-card booking">

                    <div className="card-icon orange">

                        <i className="bi bi-house-check-fill"></i>

                    </div>

                    <div>

                        <h3>
                            {visits.length}
                        </h3>

                        <p>
                            Site Visits
                        </p>

                    </div>

                </div>

            </div>

            {/* CHARTS */}

            <div className="row mt-4">

                <div className="col-lg-6">

                    <div className="chart-card">

                        <h5>
                            Activity Overview
                        </h5>

                        <ResponsiveContainer
                            width="100%"
                            height={300}
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

                <div className="col-lg-6">

                    <div className="chart-card">

                        <h5>
                            Performance
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
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>

            {/* TABLES */}

            <div className="row mt-4">

                <div className="col-lg-6">

                    <div className="chart-card">

                        <h5>
                            📞 Upcoming Follow Ups
                        </h5>

                        <table className="table">

                            <thead>

                                <tr>

                                    <th>
                                        Lead
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    followUps
                                    .slice(0,5)
                                    .map(
                                        followUp => (

                                            <tr
                                                key={
                                                    followUp.followUpId
                                                }
                                            >

                                                <td>
                                                    {
                                                        followUp.lead?.name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        followUp.followupDate
                                                    }
                                                </td>

                                            </tr>

                                        )
                                    )
                                }

                            </tbody>

                        </table>

                    </div>

                </div>

                <div className="col-lg-6">

                    <div className="chart-card">

                        <h5>
                            🏠 Upcoming Site Visits
                        </h5>

                        <table className="table">

                            <thead>

                                <tr>

                                    <th>
                                        Lead
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    visits
                                    .slice(0,5)
                                    .map(
                                        visit => (

                                            <tr
                                                key={
                                                    visit.visitId
                                                }
                                            >

                                                <td>
                                                    {
                                                        visit.lead?.name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        visit.visitDate
                                                    }
                                                </td>

                                            </tr>

                                        )
                                    )
                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            {/* QUICK ACTIONS */}

            <div className="row mt-4">

                <div className="col-md-4">

                    <div className="chart-card text-center">

                        <i
                            className="bi bi-telephone-fill"
                            style={{
                                fontSize:"40px"
                            }}
                        ></i>

                        <h5 className="mt-3">

                            Follow Ups

                        </h5>

                        <p>

                            Schedule customer calls

                        </p>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="chart-card text-center">

                        <i
                            className="bi bi-house-check-fill"
                            style={{
                                fontSize:"40px"
                            }}
                        ></i>

                        <h5 className="mt-3">

                            Site Visits

                        </h5>

                        <p>

                            Manage property visits

                        </p>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="chart-card text-center">

                        <i
                            className="bi bi-journal-text"
                            style={{
                                fontSize:"40px"
                            }}
                        ></i>

                        <h5 className="mt-3">

                            Lead Notes

                        </h5>

                        <p>

                            Track customer interactions

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default AgentDashboard;