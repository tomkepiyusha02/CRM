import React from "react";

import {
BrowserRouter,
Routes,
Route
}
from "react-router-dom";


import LoginPage
from "./pages/LoginPage";

import EnquiryPage
from "./pages/EnquiryPage";

import DashboardPage
from "./pages/DashboardPage";

import AdminDashboardPage
from "./pages/AdminDashboardPage";

import ManagersPage
from "./pages/ManagersPage";

import AgentsPage
from "./pages/AgentsPage";

import PropertiesPage
from "./pages/PropertiesPage";

import AgentDashboardPage
from "./pages/AgentDashboardPage";

import ProtectedRoute
from "./components/common/ProtectedRoute";

import ManagersViewPage from "./components/admin/ManagersViewPage";
import AgentsViewPage from "./components/admin/AgentsViewPage";
import PropertiesViewPage from "./components/admin/PropertiesViewPage";
import LeadsViewPage from "./components/admin/LeadsViewPage";

import {
ToastContainer
}
from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap-icons/font/bootstrap-icons.css";

import "react-toastify/dist/ReactToastify.css";

function App() {

return (

<BrowserRouter>

<Routes>

<Route
path="/"
element={<LoginPage />}
/>

<Route
path="/enquiry"
element={<EnquiryPage />}
/>

<Route
path="/dashboard"
element={
<ProtectedRoute
role="MANAGER"
>
<DashboardPage />
</ProtectedRoute>
}
/>



<Route
path="/admin/dashboard"
element={
<ProtectedRoute
role="ADMIN"
>
<AdminDashboardPage />
</ProtectedRoute>
}
/>



<Route
path="/admin/managers"
element={
<ProtectedRoute
role="ADMIN"
>
<ManagersPage />
</ProtectedRoute>
}
/>



<Route
path="/admin/agents"
element={
<ProtectedRoute
role="ADMIN"
>
<AgentsPage />
</ProtectedRoute>
}
/>



<Route
path="/admin/properties"
element={
<ProtectedRoute
role="ADMIN"
>
<PropertiesPage />
</ProtectedRoute>
}
/>



<Route
path="/agent/dashboard"
element={
<ProtectedRoute
role="AGENT"
>
<AgentDashboardPage />
</ProtectedRoute>
}
/>

<Route
path="/admin/view/managers"
element={
<ProtectedRoute role="ADMIN">
<ManagersViewPage />
</ProtectedRoute>
}
/>

<Route
path="/admin/view/agents"
element={
<ProtectedRoute role="ADMIN">
<AgentsViewPage />
</ProtectedRoute>
}
/>

<Route
path="/admin/view/properties"
element={
<ProtectedRoute role="ADMIN">
<PropertiesViewPage />
</ProtectedRoute>
}
/>

<Route
path="/admin/view/leads"
element={
<ProtectedRoute role="ADMIN">
<LeadsViewPage />
</ProtectedRoute>
}
/>

</Routes>

<ToastContainer />

</BrowserRouter>

);
}

export default App;