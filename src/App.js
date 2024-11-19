import React from "react";
import UserList from "./components/UsersList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container h-screen bg-center mx-auto p-4 bg-cover bg-[url('https://res.cloudinary.com/duqopzabn/image/upload/v1732026730/rb_4565_dkjgtn.png')]">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <h1 className="text-3xl font-bold mb-4 text-center relative z-10 text-white">
        User Management Dashboard
      </h1>
      <UserList />
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={true}
      />
    </div>
  );
}

export default App;
