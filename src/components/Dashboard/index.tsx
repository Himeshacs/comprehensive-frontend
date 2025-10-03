import React from "react";
import { useAuth } from "../../context/AuthContext";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="card">
        <h2>Welcome, {user?.firstName}!</h2>
        <p>This is your dashboard where you can see an overview of the system.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "30px" }}>
          <div style={{ padding: "20px", backgroundColor: "#3498db", color: "white", borderRadius: "8px" }}>
            <h3>Users</h3>
            <p>Manage system users</p>
          </div>
          <div style={{ padding: "20px", backgroundColor: "#2ecc71", color: "white", borderRadius: "8px" }}>
            <h3>Analytics</h3>
            <p>View system statistics</p>
          </div>
          <div style={{ padding: "20px", backgroundColor: "#e67e22", color: "white", borderRadius: "8px" }}>
            <h3>Reports</h3>
            <p>Generate reports</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
