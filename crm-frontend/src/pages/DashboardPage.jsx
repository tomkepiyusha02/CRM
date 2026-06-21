import Sidebar from "../components/common/Sidebar";
import ManagerDashboard from "../components/dashboard/ManagerDashboard";

import "../styles/Dashboard.css";

import LogoutService from "../services/LogoutService";
import Swal from "sweetalert2";
import { useState } from "react";

function DashboardPage() {
  const[activeTab,setActiveTab] = useState("dashboard");

  const handleLogout = () => {

    Swal.fire({
      title: "Logout ?",
      text: "Do you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      confirmButtonText: "Logout"
    }).then((result) => {

      if (result.isConfirmed) {

        LogoutService.logout();

      }

    });

  };

  return (

    <div className="container-fluid">

      <div className="row">

        {/* Sidebar */}

        <div className="col-md-2 p-0">

          <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab} />

        </div>

        {/* Main Content */}

        <div className="col-md-10">

          <div className="d-flex justify-content-between align-items-center p-3 border-bottom">

          

            

          </div>

          <ManagerDashboard 
          activeTab={activeTab}
          />

        </div>

      </div>

    </div>

  );
}

export default DashboardPage;