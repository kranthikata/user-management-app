import React, { useState, useEffect } from "react";
import { addUser, updateUser } from "../services/api";

// Component for handling user form (Add/Edit)
const UserForm = ({ user, closeForm, updateUserList }) => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  // State to manage error messages
  const [error, setError] = useState(null);

  // Prefill the form fields when editing an existing user
  useEffect(() => {
    if (user) {
      // Split full name into first and last name
      const [firstName, ...lastNameParts] = user.name.split(" ");
      setFormData({
        firstName,
        lastName: lastNameParts.join(" "),
        email: user.email,
        department: user.company.name,
      });
    }
  }, [user]); // Dependency ensures this runs only when `user` changes

  // Handle input field changes and update state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for adding or updating a user
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form behavior (page refresh)

    // Choose the correct API call based on whether it's an edit or add operation
    const apiCall = user
      ? updateUser(user.id, {
          ...user,
          name: `${formData.firstName} ${formData.lastName}`, // Combine first and last name
          email: formData.email,
          company: { ...user.company, name: formData.department }, // Update department name
        })
      : addUser(formData); // Add new user

    // Perform API call and handle the response
    apiCall
      .then((response) => {
        updateUserList(response.data); // Update the parent component's user list
        closeForm(); // Close the form
      })
      .catch(() => setError("Failed to save user details")); // Handle errors
  };

  return (
    // Modal container
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      {/* Form container */}
      <div className="bg-white p-6 rounded shadow-md w-[50%]">
        {/* Form heading */}
        <h2 className="text-xl mb-4">{user ? "Edit User" : "Add User"}</h2>
        {/* Error message */}
        {error && <p className="text-red-500">{error}</p>}
        {/* Form fields */}
        <form onSubmit={handleSubmit}>
          {/* Dynamically generate input fields for firstName, lastName, email, and department */}
          {["firstName", "lastName", "email", "department"].map((field) => (
            <div className="mb-2" key={field}>
              {/* Label for input field */}
              <label className="block mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                {/* Capitalize field name */}
              </label>
              {/* Input field */}
              <input
                type={field === "email" ? "email" : "text"} // Email-specific input type
                name={field} // Input name matches the formData key
                value={formData[field]} // Controlled component bound to state
                onChange={handleChange} // Handle input change
                className="border px-2 py-1 w-full" // Styling
                required // Make the field mandatory
              />
            </div>
          ))}
          {/* Form buttons */}
          <div className="flex justify-end">
            {/* Cancel button */}
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 mr-2 rounded"
              onClick={closeForm} // Close form on cancel
            >
              Cancel
            </button>
            {/* Save button */}
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
