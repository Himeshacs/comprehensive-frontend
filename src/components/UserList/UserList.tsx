import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { User, userService } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";

const UserList: React.FC = () => {
  const { user, logout } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ status: "" });

  const { data, isLoading, error } = useQuery(["users", page, search, filters], () => userService.getUsers(page, 10, search, filters), {
    keepPreviousData: true,
  });

  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (search.length > 2) {
      userService.getSearchSuggestions(search).then(setSearchSuggestions);
    } else {
      setSearchSuggestions([]);
    }
  }, [search]);

  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Users</h1>
        <div>
          Welcome, {user.firstName}!
          <button onClick={logout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
        </div>
      </div>

      <div className="filter-section">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          style={{ padding: "10px", width: "300px" }}
        />

        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} style={{ padding: "10px", marginLeft: "10px" }}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {searchSuggestions.length > 0 && (
          <div style={{ border: "1px solid #ccc", background: "white" }}>
            {searchSuggestions.map((suggestion) => (
              <div key={suggestion} onClick={() => setSearch(suggestion)} style={{ padding: "5px", cursor: "pointer" }}>
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading users</div>
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
              </tr>
            </thead>
            <tbody>
              {data?.data.map((user: User) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.status}</td>
                  <td>{user.roles.join(", ")}</td>
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
                Page {page} of {data.meta.totalPages}
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
