import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar slide-in-left">
        {/* <h2 className="brand-title">💊 MedStore</h2> */}
        <ul className="menu-list">
          <li onClick={() => navigate("/dashboard")}>👤 Dashboard</li>
          <li onClick={() => navigate("/add-medicine")}>➕ Add Medicine</li>
          <li onClick={() => navigate("/medicines")}>📋 View Medicines</li>
          <li onClick={() => navigate("/sell-medicine")}>🛒 Sell Medicine</li>
          <li className="logout" onClick={logout}>🚪 Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <h1>Dashboard</h1>
          <div className="welcome-msg">
            Welcome, {user?.username || "User"} 👋
          </div>
        </header>

        {/* Dashboard Cards */}
        <main className="cards">
          <Card title="Total Medicines" value="132" icon="💊" color="green" />
          <Card title="Today's Sales" value="₹12,350" icon="💰" color="blue" />
          <Card title="Users" value="5" icon="👥" color="purple" />
        </main>
      </div>
    </div>
  );
}

function Card({ title, value, icon, color }) {
  return (
    <div className={`card ${color}`}>
      <div>
        <div className="card-title">{title}</div>
        <div className="card-value">{value}</div>
      </div>
      <div className="card-icon">{icon}</div>
    </div>
  );
}

export default Dashboard;
