import axios from "axios";
import React, { useEffect, useState } from "react";
import "../AdminPages/subscription.css";

export default function SubscribedUsers() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchDetails = async () => {
    try {
      const logindataString = localStorage.getItem("loginData");

      const logindata = JSON.parse(logindataString);

      const token = logindata.token;

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Make GET request to your backend API
      const response = await axios.get(
        "http://localhost:8000/api/admin/getdetails",
        {
          headers: headers,
        }
      );

      // Handle the response data
      console.log("Data from backend:", response.data);

      // return response.data;
      setUsers(response.data);
      setTotalUsers(response.data.length);
    } catch (error) {
      // Handle errors
      console.error("Error fetching data:", error);
      throw error; // Optional: propagate the error
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <>
      <section className="subscribed-users-section">
        <div className="subContainer">
          <h1>Subscribed Users Data</h1>
        </div>
        <div className="subContainer subscribed-users">
          {/* Display total number of users */}
          <p style={{ color: "black", fontSize: "25px", fontWeight: "bold" }}>
            Total Users: {totalUsers}
          </p>

          {/* User table */}
          <table className="subuser-table">
            <thead>
              <tr>
                <th> User Id</th>
                <th>Payment ID</th>
                <th>Plan ID</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>
                  <strong>Users Status</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => {
                return (
                  <tr key={index}>
                    <td>{curUser.user}</td>
                    <td>{curUser.paymentId}</td>
                    <td>{curUser.planId}</td>
                    <td>{curUser.startDate}</td>
                    <td>{curUser.endDate}</td>
                    <td style={{ color: "green" }}>
                      <strong>{curUser.paymentStatus}</strong>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
