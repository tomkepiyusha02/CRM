import React,
{
    useState
}
from "react";

import AdminLayout
from "../components/admin/AdminLayout";



import AgentTable
from "../components/admin/AgentTable";

function AgentsPage() {

    const [showForm,
        setShowForm] =
        useState(false);

    return (

        <AdminLayout>

<div className="lead-page-header">

<div>

    <h1 className="lead-page-title">
        👨‍💻 Approved Agents
    </h1>

    <p className="lead-page-subtitle">
        Manage all approved agents
    </p>

</div>



</div>

            {
                showForm && (

                    <div className="form-modal">

                        <div
                            className="form-modal-content"
                        >

                            <div
                                style={{
                                    display:"flex",
                                    justifyContent:"space-between",
                                    alignItems:"center",
                                    marginBottom:"20px"
                                }}
                            >

                                <h3>
                                    Add Agent
                                </h3>

                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        setShowForm(false)
                                    }
                                >
                                    X
                                </button>

                            </div>

                        

                        </div>

                    </div>

                )
            }

            <div className="table-card">

                <AgentTable />

            </div>

        </AdminLayout>

    );
}

export default AgentsPage;