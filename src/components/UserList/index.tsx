import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { User, userService } from "../../services/userService";
import { ComplexFilter, FilterField } from "../../types/filter";
import { useAuth } from "../../context/AuthContext";
import { AdvancedFilter } from "../AdvancedFilter";

const UserList: React.FC = () => {
  const { user, logout } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ComplexFilter | null>(null);

  const { data, isLoading, error } = useQuery(["users", page, search, filter], () => userService.getUsers(page, 10, search, filter), {
    keepPreviousData: true,
  });

  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (search.length > 2) {
      userService.getSearchSuggestions(search).then((suggestions: React.SetStateAction<string[]>) => {
        setSearchSuggestions(suggestions);
        setShowSuggestions(true);
      });
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [search]);

  const handleSuggestionClick = (suggestion: string) => {
    setSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleFilterChange = (newFilter: ComplexFilter | null) => {
    setFilter(newFilter);
    setPage(1); // Reset to first page when filter changes
  };

  // Define filterable fields
  const filterFields: FilterField[] = [
    { label: "Email", value: "email", type: "text" },
    { label: "First Name", value: "firstName", type: "text" },
    { label: "Last Name", value: "lastName", type: "text" },
    {
      label: "Status",
      value: "status",
      type: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
    {
      label: "Role",
      value: "roles",
      type: "select",
      options: [
        { label: "User", value: "user" },
        { label: "Admin", value: "admin" },
      ],
    },
  ];

  if (!user) {
    return (
      <div className="card text-center">
        <h2>Please log in to access the system</h2>
        <button
          onClick={() => (window.location.href = "/login")}
          className="mt-20"
          style={{
            padding: "12px 24px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#2c3e50", fontSize: "2rem" }}>User Management System</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>
            Welcome,{" "}
            <strong style={{ color: "#2c3e50" }}>
              {user.firstName} {user.lastName}
            </strong>
            {user.roles.includes("admin") && (
              <span
                style={{
                  backgroundColor: "#e74c3c",
                  color: "white",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "0.7rem",
                  marginLeft: "8px",
                  fontWeight: "bold",
                }}
              >
                Admin
              </span>
            )}
          </span>
          <button
            onClick={logout}
            style={{
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.9rem",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#c0392b")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#e74c3c")}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="filter-section">
        <div style={{ position: "relative", marginBottom: "15px" }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by email, first name, or last name..."
            style={{ padding: "12px", width: "100%", maxWidth: "500px" }}
            onFocus={() => searchSuggestions.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          {showSuggestions && searchSuggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {searchSuggestions.map((suggestion) => (
                <div key={suggestion} onClick={() => handleSuggestionClick(suggestion)} className="suggestion-item">
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Advanced Filter Section */}
      <AdvancedFilter fields={filterFields} onFilterChange={handleFilterChange} initialFilter={filter} />

      {/* Active Filters Indicator */}
      {filter && filter.conditions.length > 0 && (
        <div
          style={{
            padding: "10px 15px",
            backgroundColor: "#e8f4fd",
            border: "1px solid #3498db",
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        >
          <strong>Active Filters:</strong> {filter.conditions.length} condition(s) applied
          <button
            onClick={() => setFilter(null)}
            style={{
              marginLeft: "15px",
              padding: "2px 8px",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            Clear All
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="loading">Loading users...</div>
      ) : error ? (
        <div className="error">Error loading users. Please try again.</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Status</th>
                <th>Roles</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((user: User) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>
                    <span
                      style={{
                        color: user.status === "active" ? "#27ae60" : "#e74c3c",
                        fontWeight: "bold",
                      }}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    {user.roles.map((role) => (
                      <span
                        key={role}
                        style={{
                          backgroundColor: role === "admin" ? "#e74c3c" : "#3498db",
                          color: "white",
                          padding: "2px 8px",
                          borderRadius: "12px",
                          fontSize: "0.7rem",
                          marginRight: "5px",
                          display: "inline-block",
                        }}
                      >
                        {role}
                      </span>
                    ))}
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {data?.meta && (
            <div className="pagination">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                Previous
              </button>

              <span>
                Page {page} of {data.meta.totalPages} (Total: {data.meta.total} users)
              </span>

              <button onClick={() => setPage((p) => Math.min(data.meta.totalPages, p + 1))} disabled={page === data.meta.totalPages}>
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserList;
