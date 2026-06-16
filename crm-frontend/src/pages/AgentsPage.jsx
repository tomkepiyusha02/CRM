import React from "react";

import AgentForm
from "../components/admin/AgentForm";

import AgentTable
from "../components/admin/AgentTable";

import "../styles/Agent.css";

function AgentsPage() {

    return (

        <div className="agent-page">

            <h2 className="mb-4">
                Agent Management
            </h2>

            <AgentForm />

            <div className="mt-4">

                <AgentTable />

            </div>

        </div>

    );
}

export default AgentsPage;