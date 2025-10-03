import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    darkMode: false,
    language: "en",
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div>
      <h1>Settings</h1>

      <div className="card">
        <h2>Profile Settings</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#3498db",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </div>
          <div>
            <h3>
              {user?.firstName} {user?.lastName}
            </h3>
            <p style={{ color: "#7f8c8d" }}>{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: "20px" }}>
        <h2>Preferences</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h4>Email Notifications</h4>
              <p style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>Receive email notifications</p>
            </div>
            <label style={{ position: "relative", display: "inline-block", width: "50px", height: "24px" }}>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange("emailNotifications", e.target.checked)}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: settings.emailNotifications ? "#3498db" : "#ccc",
                  transition: "0.4s",
                  borderRadius: "24px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    content: '""',
                    height: "16px",
                    width: "16px",
                    left: settings.emailNotifications ? "26px" : "4px",
                    bottom: "4px",
                    backgroundColor: "white",
                    transition: "0.4s",
                    borderRadius: "50%",
                  }}
                />
              </span>
            </label>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h4>Dark Mode</h4>
              <p style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>Switch to dark theme</p>
            </div>
            <label style={{ position: "relative", display: "inline-block", width: "50px", height: "24px" }}>
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => handleSettingChange("darkMode", e.target.checked)}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: settings.darkMode ? "#3498db" : "#ccc",
                  transition: "0.4s",
                  borderRadius: "24px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    content: '""',
                    height: "16px",
                    width: "16px",
                    left: settings.darkMode ? "26px" : "4px",
                    bottom: "4px",
                    backgroundColor: "white",
                    transition: "0.4s",
                    borderRadius: "50%",
                  }}
                />
              </span>
            </label>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h4>Language</h4>
              <p style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>Select your preferred language</p>
            </div>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange("language", e.target.value)}
              style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid #bdc3c7" }}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
