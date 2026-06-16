import React, {
    useEffect,
    useState
} from "react";

import UserService
from "../../services/UserService";
import Swal from "sweetalert2";

function ManagerTable() {

    const [managers, setManagers] =
        useState([]);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        loadManagers();

    }, []);

    const loadManagers = async () => {

        const response =
            await UserService.getManagers();

        setManagers(response.data);
    };

    const deleteManager = async (id) => {

        Swal.fire({
            title: "Delete Manager?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545"
        }).then(async (result) => {
    
            if(result.isConfirmed){
    
                await UserService.deleteUser(id);
    
                Swal.fire(
                    "Deleted!",
                    "Manager Removed",
                    "success"
                );
    
                loadManagers();
            }
        });
    };

    const filteredManagers =
        managers.filter((manager) =>
            manager.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (

        <div className="manager-table-card">

            <div className="d-flex justify-content-between mb-3">

                <h4>
                    Managers
                </h4>

                <input
                    type="text"
                   className="form-control manager-search"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

            </div>

            <table className="table table-hover manager-table">

                <thead>

                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>City</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        filteredManagers.map(
                            (manager) => (

                                <tr
                                    key={
                                        manager.userId
                                    }
                                >

                                    <td>
                                        {manager.name}
                                    </td>

                                    <td>
                                        {manager.email}
                                    </td>

                                    <td>
                                        {manager.mobile}
                                    </td>

                                    <td>
                                        {
                                            manager.assignedCity
                                        }
                                    </td>

                                    <td>

                                        <button
                                            className="manager-delete-btn"
                                            onClick={() =>
                                                deleteManager(
                                                    manager.userId
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

export default ManagerTable;