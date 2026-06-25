import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import LeadService from "../../services/LeadService";

function ManagerAgentTable() {

    const [agents, setAgents] =
        useState([]);

    const [leads, setLeads] =
        useState([]);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

    try {

        const managerId =
            localStorage.getItem("userId");

        const city =
            localStorage.getItem(
                "assignedCity"
            );

        const agentRes =
            await UserService.getAgentsByManager(
                managerId
            );

        const leadRes =
            await LeadService.getLeadsByCity(
                city
            );

        setAgents(
            agentRes.data
        );

        setLeads(
            leadRes.data
        );

    }

    catch(error){

        console.log(error);

    }

};

    const getLeadCount =
        (agentName) => {

            return leads.filter(
                lead =>
                    lead.assignedAgentName ===
                    agentName
            ).length;
        };

    return (

        <div className="chart-card">

            <div className="table-title">

                <i className="bi bi-people-fill"></i>

                <h5>
                    Agent Performance
                </h5>

            </div>

            <table className="table">

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Area</th>

                        <th>Email</th>

                        <th>Mobile</th>

                        <th>Total Leads</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        agents.map(
                            agent => (

                                <tr
                                    key={
                                        agent.userId
                                    }
                                >

                                    <td>
                                        {agent.name}
                                    </td>

                                    <td>
                                        {
                                            agent.assignedArea
                                        }
                                    </td>

                                    <td>
                                        {agent.email}
                                    </td>

                                    
                                    <td>{agent.mobile}</td>
                                    

                                    <td>

                                        <span
                                            className="badge bg-primary"
                                        >

                                            {
                                                getLeadCount(
                                                    agent.name
                                                )
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
    );
}

export default ManagerAgentTable;