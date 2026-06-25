import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import Swal from "sweetalert2";

function PendingRequestsTable() {

    const [agents, setAgents] = useState([]);
    const [managers, setManagers] = useState([]);
    const [selectedManagers, setSelectedManagers] = useState({});

    useEffect(() => {

        loadPendingAgents();
        loadManagers();

    }, []);

    const loadPendingAgents = async () => {

        try {

            const response =
                await UserService.getPendingAgents();

            setAgents(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const loadManagers = async () => {

        try {

            const response =
                await UserService.getManagers();

            setManagers(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const approveAgent = async (agentId) => {

        const managerId =
            selectedManagers[agentId];

        if (!managerId) {

            Swal.fire(
                "Please select a manager first"
            );

            return;
        }

        try {

            await UserService.approveAgent(
                agentId,
                managerId
            );

            Swal.fire(
                "Approved!",
                "Agent assigned successfully",
                "success"
            );

            loadPendingAgents();

        } catch (error) {

            Swal.fire(
                "Error",
                "Unable to approve agent",
                "error"
            );
        }
    };

    const rejectAgent = async (id) => {

        try {

            await UserService.rejectAgent(id);

            Swal.fire(
                "Rejected!",
                "Agent Rejected",
                "success"
            );

            loadPendingAgents();

        } catch (error) {

            Swal.fire(
                "Error",
                "Unable To Reject Agent",
                "error"
            );
        }
    };

    return (

        <div className="table-card">

            <h4 className="mb-4">
                Pending Agent Requests
            </h4>

            <table className="table table-hover">

                <thead>

                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>City</th>
                        <th>Area</th>
                        <th>Manager</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {agents.map((agent) => (

                        <tr key={agent.userId}>

                            <td>{agent.name}</td>

                            <td>{agent.email}</td>

                            <td>{agent.mobile}</td>

                            <td>{agent.assignedCity}</td>

                            <td>{agent.assignedArea}</td>
<td className="manager-column">

    <div className="manager-select-wrapper">

       <select
    className="manager-select"
    value={
        selectedManagers[agent.userId] || ""
    }
    onChange={(e) =>
        setSelectedManagers({
            ...selectedManagers,
            [agent.userId]: e.target.value
        })
    }
>

            <option value="">
                Select Manager
            </option>

            {
                managers
                    .filter(
                        manager =>
                            manager.assignedCity ===
                            agent.assignedCity
                    )
                    .map(manager => (

                        <option
                            key={manager.userId}
                            value={manager.userId}
                        >
                            {manager.name}
                        </option>

                    ))
            }

        </select>

    </div>

</td>

                            <td>

                                <button
                                    className="btn btn-success btn-sm me-2"
                                    onClick={() =>
                                        approveAgent(
                                            agent.userId
                                        )
                                    }
                                >
                                    Approve
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        rejectAgent(
                                            agent.userId
                                        )
                                    }
                                >
                                    Reject
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
}

export default PendingRequestsTable;