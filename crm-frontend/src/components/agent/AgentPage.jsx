import React,{useState} from "react";

import AgentSidebar from "../components/agent/AgentSidebar";
import AgentDashboard from "../components/agent/AgentDashboard";
import AgentLeads from "../components/agent/AgentLeads";
import FollowUpPage from "../components/agent/FollowUpPage";
import SiteVisitPage from "../components/agent/SiteVisitPage";
import LeadNotesPage from "../components/agent/LeadNotesPage";
import AgentStatistics from "../components/agent/AgentStatistics";

function AgentPage() {

    const [activeTab,setActiveTab] =
        useState("dashboard");

    return (

        <div className="dashboard-layout">

            <AgentSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <div className="dashboard-content">
            {
    activeTab === "followups" &&
    <FollowUpPage />
}

{
    activeTab === "visits" &&
    <SiteVisitPage />
}

{
    activeTab === "notes" &&
    <LeadNotesPage />
}

{
    activeTab === "stats" &&
    <AgentStatistics />
}

            </div>

        </div>
    );
}

export default AgentPage;