import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = () => {
    // Implement profile update logic
    console.log("Saving profile:", profile);
    alert("Profile updated successfully!");
  };

  const handleChangePassword = () => {
    if (profile.newPassword !== profile.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    // Implement password change logic
    console.log("Changing password");
    alert("Password changed successfully!");
  };

  return (
    <div>
      <h1>User Profile</h1>

      <div className="card">
        <h2>Personal Information</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>First Name</label>
            <input
              type="text"
              value={profile.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #bdc3c7", borderRadius: "4px" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Last Name</label>
            <input
              type="text"
              value={profile.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #bdc3c7", borderRadius: "4px" }}
            />
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #bdc3c7", borderRadius: "4px" }}
            />
          </div>
        </div>

        <button
          onClick={handleSaveProfile}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Save Profile
        </button>
      </div>

      <div className="card" style={{ marginTop: "20px" }}>
        <h2>Change Password</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Current Password</label>
            <input
              type="password"
              value={profile.currentPassword}
              onChange={(e) => handleInputChange("currentPassword", e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #bdc3c7", borderRadius: "4px" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>New Password</label>
            <input
              type="password"
              value={profile.newPassword}
              onChange={(e) => handleInputChange("newPassword", e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #bdc3c7", borderRadius: "4px" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Confirm New Password</label>
            <input
              type="password"
              value={profile.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #bdc3c7", borderRadius: "4px" }}
            />
          </div>
        </div>

        <button
          onClick={handleChangePassword}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#2ecc71",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
