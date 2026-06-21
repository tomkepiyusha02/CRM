import React,
{
    useEffect,
    useState
}
from "react";

import LeadService
from "../../services/LeadService";

import FollowUpService
from "../../services/FollowUpService";

import SiteVisitService
from "../../services/SiteVisitService";

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
}
from "recharts";

function AgentStatistics() {

    const [leads,
        setLeads] =
        useState([]);

    const [followUps,
        setFollowUps] =
        useState([]);

    const [visits,
        setVisits] =
        useState([]);

    useEffect(() => {

        loadData();

    }, []);

    const loadData =
        async () => {

            try {

                const userId =
                    localStorage.getItem(
                        "userId"
                    );

                const leadRes =
                    await LeadService
                        .getAssignedLeads(
                            userId
                        );

                setLeads(
                    leadRes.data
                );

                const followRes =
                    await FollowUpService
                        .getByAgent(
                            userId
                        );

                setFollowUps(
                    followRes.data
                );

                const visitRes =
                    await SiteVisitService
                        .getByAgent(
                            userId
                        );

                setVisits(
                    visitRes.data
                );

            }

            catch(error){

                console.log(error);

            }

        };

    const contacted =
        leads.filter(
            l => l.status === "CONTACTED"
        ).length;

    const interested =
        leads.filter(
            l => l.status === "INTERESTED"
        ).length;

    const booking =
        leads.filter(
            l => l.status === "BOOKING"
        ).length;

    const chartData = [

        {
            name:"CONTACTED",
            value:contacted
        },

        {
            name:"INTERESTED",
            value:interested
        },

        {
            name:"BOOKING",
            value:booking
        }

    ];

    const COLORS = [

        "#3b82f6",
        "#10b981",
        "#f59e0b"

    ];

    return (

        <div>

            <div className="lead-page-header">

                <div>

                    <h2>
                        📊 Agent Statistics
                    </h2>

                    <p>
                        Performance Overview
                    </p>

                </div>

            </div>

            <div className="dashboard-cards">

                <div className="modern-card">

                    <h3>
                        {leads.length}
                    </h3>

                    <p>
                        Total Leads
                    </p>

                </div>

                <div className="modern-card">

                    <h3>
                        {followUps.length}
                    </h3>

                    <p>
                        Follow Ups
                    </p>

                </div>

                <div className="modern-card">

                    <h3>
                        {visits.length}
                    </h3>

                    <p>
                        Site Visits
                    </p>

                </div>

            </div>

            <div className="row mt-4">

                <div className="col-lg-6">

                    <div className="chart-card">

                        <h5>
                            Lead Status
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

                <div className="col-lg-6">

                    <div className="chart-card">

                        <h5>
                            Activity
                        </h5>

                        <ResponsiveContainer
                            width="100%"
                            height={320}
                        >

                            <BarChart
                                data={[
                                    {
                                        name:"Leads",
                                        value:leads.length
                                    },
                                    {
                                        name:"FollowUps",
                                        value:followUps.length
                                    },
                                    {
                                        name:"Visits",
                                        value:visits.length
                                    }
                                ]}
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

        </div>

    );
}

export default AgentStatistics;