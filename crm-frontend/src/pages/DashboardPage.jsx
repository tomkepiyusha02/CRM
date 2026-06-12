import Sidebar from "../components/common/Sidebar";
import ManagerDashboard from "../components/dashboard/ManagerDashboard";

import "../styles/Dashboard.css";

import LogoutService from "../services/LogoutService";
import Swal from "sweetalert2";

function DashboardPage() {

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

          <Sidebar />

        </div>

        {/* Main Content */}

        <div className="col-md-10">

          <div className="d-flex justify-content-between align-items-center p-3 border-bottom">

            <div>

              <h4 className="mb-1">
                Welcome, {localStorage.getItem("name")}
              </h4>

              <p className="text-muted mb-0">
                Manage Assigned Leads and Customer Follow-ups
              </p>

            </div>

            <button
              className="btn btn-danger"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </button>

          </div>

          <ManagerDashboard />

        </div>

      </div>

    </div>

  );
}

export default DashboardPage;