import React, { useState } from "react";
import { addUser, updateUser } from "../services/api";

const UserForm = ({ user, closeForm, updateUserList }) => {
  let firstName = "";
  let lastName = "";
  if (user) {
    const fullName = user.name.trim();
    const nameParts = fullName.split(" ");

    if (nameParts.length > 1) {
      firstName = nameParts[0];
      lastName = nameParts.slice(1).join(" ");
    } else {
      const mid = Math.floor(fullName.length / 2);
      firstName = fullName.slice(0, mid);
      lastName = fullName.slice(mid);
    }
  }

  const userInfo = user
    ? {
        firstName,
        lastName,
        email: user.email,
        department: user.company.name,
      }
    : null;

  const [formData, setFormData] = useState(
    userInfo || { firstName: "", lastName: "", email: "", department: "" }
  );
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiCall = user
      ? updateUser(user.id, {
          ...user,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          company: { ...user["company"], name: formData.department },
        })
      : addUser(formData);

    apiCall
      .then((response) => {
        updateUserList(response.data);
        closeForm();
      })
      .catch(() => setError("Failed to save user details"));
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-[50%]">
        <h2 className="text-xl mb-4">{user ? "Edit User" : "Add User"}</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 mr-2 rounded"
              onClick={closeForm}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
