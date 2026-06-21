import React, { useState } from "react";

import AgentSidebar from "../components/agent/AgentSidebar";
import AgentDashboard from "../components/agent/AgentDashboard";

function AgentDashboardPage() {

    const [activeTab, setActiveTab] =
        useState("dashboard");

    return (

        <div className="dashboard-layout">

            <AgentSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <div className="dashboard-content">

                <AgentDashboard
                    activeTab={activeTab}
                />

            </div>

        </div>

    );
}

export default AgentDashboardPage;