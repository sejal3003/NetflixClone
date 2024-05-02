import React, { useEffect, useState } from "react";
import axios from "axios";
import "../AdminPages/adUsers.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const fetchData = async () => {
    try {
      // Retrieve the logindata object from localStorage
      const logindataString = localStorage.getItem("loginData");

      // Parse the JSON string into a JavaScript object
      const logindata = JSON.parse(logindataString);

      // Extract the token from the logindata object
      const token = logindata.token;

      // Now you can use the token for your Axios request
      console.log("Token:", token);

      const headers = {
        Authorization: `Bearer ${token}`, // Assuming your backend expects a Bearer token
      };

      // Make GET request to your backend API
      const response = await axios.get(
        "http://localhost:8000/api/admin/users",
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
    fetchData();
  }, []);

  //Delete the user onclick of the delete button

  const deleteUser = async (id) => {
    try {
      // Make DELETE request to delete user by ID
      const logindataString = localStorage.getItem("loginData");
      const logindata = JSON.parse(logindataString);
      const token = logindata.token;

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.delete(`http://localhost:8000/api/admin/users/delete/${id}`, {
        headers: headers,
      });
      toast.success("User Deleted Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Re-fetch the users
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <section className="admin-users-section">
        <div className="userContainer">
          <h1>Admin Users Data</h1>
        </div>
        <div className="userContainer admin-users">
          {/* Display total number of users */}
          <p style={{ color: "black", fontSize: "25px", fontWeight: "bold" }}>
            Total Users: {totalUsers}
          </p>

          {/* User table */}
          <table className="user-table">
            <thead>
              <tr>
                <th> User Id</th>
                <th>Email</th>
                <th>CreatedAt</th>
                <th>UpdatedAt</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => {
                return (
                  <tr key={index}>
                    <td>{curUser._id}</td>
                    <td>{curUser.email}</td>
                    <td>{curUser.createdAt}</td>
                    <td>{curUser.updatedAt}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteUser(curUser._id)}
                      >
                        Delete
                      </button>
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
