import React from "react";
import "./Admin.css";

// TODO: Add more stats and buttons

function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="dashboard-stats">
        <p>Total Movies: 100</p>
        <p>Total Users: 500</p>
        <p>Recent Activity:</p>
        <ul>
          <li>New movie added: "Movie Title" by Admin</li>
          <li>User "username" logged in</li>
        </ul>
      </div>

      <div className="section">
        <h2>Movie Management</h2>
        <div className="buttons">
          <button>Add Movie</button>
          <button>Delete Movie</button>
        </div>
      </div>

      <div className="section">
        <h2>User Management</h2>
        <div className="buttons">
          <button>View Users</button>
          <button>View User Activity</button>
        </div>

        <div className="subscription-status">
          <h3>Subscription Status</h3>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Subscription Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>user1</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>user2</td>
                <td>Inactive</td>
              </tr>
              {/* Add more rows for other users */}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section">
        <h2>Settings</h2>
        <div className="buttons">
          <button>Account Settings</button>
          <button>App Settings</button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
