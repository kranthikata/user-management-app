import React, { useState, useEffect } from "react";
import { fetchUsers, deleteUser } from "../services/api";
import UserForm from "./UserForm";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    fetchUsers()
      .then((response) => setUsers(response.data))
      .catch(() => {
        setError("Failed to fetch users");
        toast.error("Falied to fetch users");
      });
  }, []);

  const handleDelete = (id) => {
    deleteUser(id)
      .then(() => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
        toast.success("User Deleted Successful!");
      })
      .catch(() => {
        setError("Failed to delete user");
        toast.error("Falied to delete user");
      });
  };

  const openForm = (user = null) => {
    setSelectedUser(user);
    setFormVisible(true);
  };

  const closeForm = () => {
    setSelectedUser(null);
    setFormVisible(false);
  };

  const updateUserList = (updatedUser) => {
    setUsers((prev) =>
      updatedUser.id
        ? prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        : [...prev, updatedUser]
    );
    toast.success("Updated Successfully");
  };

  return (
    <div className="relative z-10">
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
          {users.map((user) => {
            const fullName = user.name?.trim();
            const nameParts = fullName?.split(" ");

            let firstName = "";
            let lastName = "";

            if (nameParts.length > 1) {
              firstName = nameParts[0];
              lastName = nameParts.slice(1).join(" ");
            } else {
              const mid = Math.floor(fullName.length / 2);
              firstName = fullName.slice(0, mid);
              lastName = fullName.slice(mid);
            }

            return (
              <li
                key={user.id}
                className="bg-green-200 bg-opacity-80 flex mb-2 py-2 rounded-sm"
              >
                <p className="w-[16.66%] text-wrap">{user.id}</p>
                <p className="w-[16.66%] text-wrap">{firstName}</p>
                <p className="w-[16.66%] text-wrap">{lastName}</p>
                <p className="w-[16.66%] text-wrap">{user.email}</p>
                <p className="w-[16.66%] text-wrap">{user.company?.name}</p>
                <div className="w-[16.66%]">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                    onClick={() => openForm(user)}
                  >
                    <MdModeEdit />
                  </button>
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
      <div className="text-center w-[90%] mx-auto">
        <button
          className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
          onClick={() => openForm()}
        >
          Add User
        </button>
      </div>
      {isFormVisible && (
        <UserForm
          user={selectedUser}
          closeForm={closeForm}
          updateUserList={updateUserList}
        />
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default UserList;
