import React, { useEffect, useState } from "react";

import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Legend
} from "recharts";

import LeadService from "../../services/LeadService";

function LeadCharts() {

    const [data, setData] = useState([]);

    useEffect(() => {
        loadLeadData();
    }, []);

    const loadLeadData = async () => {

        try {

            const response =
                await LeadService.getAllLeads();

            const leads =
                response.data;

            const statusCount = {

                NEW: 0,
                CONTACTED: 0,
                INTERESTED: 0,
                BOOKING: 0

            };

            leads.forEach(lead => {

                if (statusCount[lead.status] !== undefined) {

                    statusCount[lead.status]++;
                }

            });

            setData([
                {
                    name: "New",
                    value: statusCount.NEW
                },
                {
                    name: "Contacted",
                    value: statusCount.CONTACTED
                },
                {
                    name: "Interested",
                    value: statusCount.INTERESTED
                },
                {
                    name: "Booking",
                    value: statusCount.BOOKING
                }
            ]);

        } catch (error) {

            console.log(error);
        }
    };

    const COLORS = [
        "#4f46e5",
        "#10b981",
        "#f59e0b",
        "#ef4444"
    ];

    return (

        <div className="chart-card">

            <h5>
                Lead Status Overview
            </h5>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        outerRadius={100}
                    >

                        {data.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />

                        ))}

                    </Pie>

                    <Tooltip />
                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>
    );
}

export default LeadCharts;