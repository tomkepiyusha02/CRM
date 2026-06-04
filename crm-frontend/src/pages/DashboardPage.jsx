import React from 'react';
import ManagerDashboard from '../components/dashboard/ManagerDashboard';
import '../styles/Dashboard.css';

function DashboardPage() {

  return (
    <div className="dashboard-page">

      <div className="dashboard-header">

        <h1>Lead Management Dashboard</h1>

      </div>

      <ManagerDashboard />

    </div>
  );
}

export default DashboardPage;