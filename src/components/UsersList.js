import React, { useState, useEffect } from "react";
import { fetchUsers, deleteUser } from "../services/api";
import UserForm from "./UserForm";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const UserList = () => {
  // State to store the list of users
  const [users, setUsers] = useState([]);
  // State to handle any errors
  const [error, setError] = useState(null);
  // State to manage the currently selected user for editing
  const [selectedUser, setSelectedUser] = useState(null);
  // State to toggle the visibility of the user form
  const [isFormVisible, setFormVisible] = useState(false);

  // Fetch the list of users when the component mounts
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers(); // Fetch users from API
        setUsers(response.data); // Update state with fetched users
      } catch {
        setError("Failed to fetch users"); // Handle errors during fetching
        toast.error("Failed to fetch users");
      }
    };
    getUsers();
  }, []); // Empty dependency array ensures this runs only on mount

  // Function to handle user deletion
  const handleDelete = (id) => {
    const deleteHandler = async () => {
      try {
        await deleteUser(id); // Delete user via API
        setUsers((prev) => prev.filter((user) => user.id !== id)); // Remove user from state
        toast.success("User Deleted Successfully!");
      } catch {
        setError("Failed to delete user"); // Handle errors during deletion
        toast.error("Failed to delete user");
      }
    };
    deleteHandler();
  };

  // Function to open the form for editing or adding a user
  const openForm = (user = null) => {
    setSelectedUser(user); // Set the selected user (or null for a new user)
    setFormVisible(true); // Show the form
  };

  // Function to close the user form
  const closeForm = () => {
    setSelectedUser(null); // Reset the selected user
    setFormVisible(false); // Hide the form
  };

  // Function to update the user list after adding or editing a user
  const updateUserList = (updatedUser) => {
    setUsers(
      (prev) =>
        updatedUser.id
          ? prev.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            ) // Update the existing user in the list
          : [...prev, updatedUser] // Add a new user to the list
    );
    toast.success("Updated Successfully"); // Show success notification
  };

  return (
    <div className="relative z-10">
      {/* Display the table headers */}
      <ul className="mx-auto w-[90%]">
        <div className="bg-blue-300 flex justify-around rounded-sm mb-2">
          <h2 className="w-[16.66%] text-center py-2">ID</h2>
          <h2 className="w-[16.66%] text-center py-2">First Name</h2>
          <h2 className="w-[16.66%] text-center py-2">Last Name</h2>
          <h2 className="w-[16.66%] text-center py-2">Email</h2>
          <h2 className="w-[16.66%] text-center py-2">Department</h2>
          <h2 className="w-[16.66%] text-center py-2">Actions</h2>
        </div>
        <div className="text-center">
          {/* Map over the list of users and render their details */}
          {users.map((user) => {
            const [firstName, lastName] = user.name.split(" "); // Split full name into first and last name
            return (
              <li
                key={user.id}
                className="bg-green-200 bg-opacity-80 flex mb-2 py-2 rounded-sm"
              >
                <p className="w-[16.66%]">{user.id}</p>
                <p className="w-[16.66%]">{firstName}</p>
                <p className="w-[16.66%]">{lastName}</p>
                <p className="w-[16.66%]">{user.email}</p>
                <p className="w-[16.66%]">{user.company?.name}</p>
                <div className="w-[16.66%]">
                  {/* Edit button */}
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                    onClick={() => openForm(user)}
                  >
                    <MdModeEdit />
                  </button>
                  {/* Delete button */}
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(user.id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </li>
            );
          })}
        </div>
      </ul>
      {/* Button to add a new user */}
      <div className="text-center w-[90%] mx-auto">
        <button
          className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
          onClick={() => openForm()}
        >
          Add User
        </button>
      </div>
      {/* Render the UserForm component when the form is visible */}
      {isFormVisible && (
        <UserForm
          user={selectedUser}
          closeForm={closeForm}
          updateUserList={updateUserList}
        />
      )}
      {/* Display any error message */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default UserList;
