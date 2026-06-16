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

import UserService
from "../../services/UserService";

function ManagerChart() {

    const [data,
        setData] =
        useState([]);

    useEffect(() => {

        loadManagers();

    }, []);

    const loadManagers =
        async () => {

            try {

                const response =
                    await UserService.getManagers();

                const managers =
                    response.data;

                const cityCount = {};

                managers.forEach(manager => {

                    cityCount[
                        manager.assignedCity
                    ] =
                        (cityCount[
                            manager.assignedCity
                        ] || 0) + 1;
                });

                const chartData =
                    Object.keys(cityCount)
                        .map(city => ({

                            city,

                            managers:
                                cityCount[
                                city
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
                Managers By City
            </h5>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <BarChart
                    data={data}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey="city"
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="managers"
                        fill="#10b981"
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

export default ManagerChart;