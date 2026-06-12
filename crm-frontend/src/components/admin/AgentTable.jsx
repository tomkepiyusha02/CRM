import React,
{
    useEffect,
    useState
}
from "react";

import UserService
from "../../services/UserService";
import Swal from "sweetalert2";

function AgentTable() {

    const [agents, setAgents] =
        useState([]);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        loadAgents();

    }, []);

    const loadAgents = async () => {

        const response =
            await UserService.getAgents();

        setAgents(response.data);
    };

    const deleteAgent = async (id) => {

        Swal.fire({
            title: "Delete Agent?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545"
        }).then(async (result) => {
    
            if(result.isConfirmed){
    
                await UserService.deleteUser(id);
    
                Swal.fire(
                    "Deleted!",
                    "Agent Removed",
                    "success"
                );
    
                loadAgents();
            }
        });
    };

    const filteredAgents =
        agents.filter((agent) =>
            agent.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (

        <div className="agent-table-card">

            <div className="d-flex justify-content-between mb-3">

                <h4>Agents</h4>

                <input
                    type="text"
                    className="form-control agent-search"
                    placeholder="Search Agent"
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

            </div>

            <table className="table table-hover">

                <thead>

                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>City</th>
                        <th>Area</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        filteredAgents.map(
                            (agent) => (

                                <tr
                                    key={agent.userId}
                                >

                                    <td>
                                        {agent.name}
                                    </td>

                                    <td>
                                        {agent.email}
                                    </td>

                                    <td>
                                        {agent.mobile}
                                    </td>

                                    <td>
                                        {
                                            agent.assignedCity
                                        }
                                    </td>

                                    <td>
                                        {
                                            agent.assignedArea
                                        }
                                    </td>

                                    <td>

                                        <button
                                            className="agent-delete-btn"
                                            onClick={() =>
                                                deleteAgent(
                                                    agent.userId
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

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

export default AgentTable;