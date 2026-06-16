import React, {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import DashboardStats from "./DashboardStats";

import LeadService from "../../services/LeadService";
import UserService from "../../services/UserService";
import PropertyService from "../../services/PropertyService";

function AdminCards() {

    const navigate =
        useNavigate();

    const [stats,
        setStats] =
        useState({

            leads: 0,
            managers: 0,
            agents: 0,
            properties: 0

        });

    useEffect(() => {

        loadDashboardData();

    }, []);

    const loadDashboardData =
        async () => {

            try {

                const leadResponse =
                    await LeadService.getAllLeads();

                const managerResponse =
                    await UserService.getManagers();

                const agentResponse =
                    await UserService.getAgents();

                const propertyResponse =
                    await PropertyService.getAllProperties();

                setStats({

                    leads:
                        leadResponse.data.length,

                    managers:
                        managerResponse.data.length,

                    agents:
                        agentResponse.data.length,

                    properties:
                        propertyResponse.data.length

                });

            }

            catch (error) {

                console.error(error);

            }
        };

    return (

        <div className="row">

            <DashboardStats
                title="Total Leads"
                value={stats.leads}
                icon="📋"
                bgClass="bg-blue"
                onClick={() =>
                    navigate(
                        "/admin/view/leads"
                    )
                }
            />

            <DashboardStats
                title="Managers"
                value={stats.managers}
                icon="👨‍💼"
                bgClass="bg-green"
                onClick={() =>
                    navigate(
                        "/admin/view/managers"
                    )
                }
            />

            <DashboardStats
                title="Agents"
                value={stats.agents}
                icon="👨‍💻"
                bgClass="bg-orange"
                onClick={() =>
                    navigate(
                        "/admin/view/agents"
                    )
                }
            />

            <DashboardStats
                title="Properties"
                value={stats.properties}
                icon="🏠"
                bgClass="bg-purple"
                onClick={() =>
                    navigate(
                        "/admin/view/properties"
                    )
                }
            />

        </div>

    );
}

export default AdminCards;