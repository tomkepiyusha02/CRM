import React,
{
    useEffect,
    useState
}
from "react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
}
from "recharts";

import PropertyService
from "../../services/PropertyService";

function PropertyChart() {

    const [data,
        setData] =
        useState([]);

    useEffect(() => {

        loadProperties();

    }, []);

    const loadProperties =
        async () => {

            try {

                const response =
                    await PropertyService.getAllProperties();

                const properties =
                    response.data;

                const statusCount = {};

                properties.forEach(property => {

                    statusCount[
                        property.propertyStatus
                    ] =
                        (statusCount[
                            property.propertyStatus
                        ] || 0) + 1;
                });

                const chartData =
                    Object.keys(statusCount)
                        .map(status => ({

                            status,

                            count:
                                statusCount[
                                status
                                ]

                        }));

                setData(chartData);

            } catch(error) {

                console.log(error);
            }
        };

    return (

        <div className="chart-card">

            <h5>
                Property Status Overview
            </h5>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <BarChart
                    data={data}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey="status"
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="count"
                        fill="#4f46e5"
                        radius={[
                            10,
                            10,
                            0,
                            0
                        ]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>
    );
}

export default PropertyChart;