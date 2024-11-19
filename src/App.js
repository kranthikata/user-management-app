import React from "react"; // Import React
import UserList from "./components/UsersList"; // Import the UserList component that displays the list of users
import { ToastContainer } from "react-toastify"; // Import ToastContainer from react-toastify for displaying toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import the default CSS for Toastify notifications

function App() {
  return (
    <div className="relative min-h-screen bg-center mx-auto p-4 bg-cover bg-[url('https://res.cloudinary.com/duqopzabn/image/upload/v1732026730/rb_4565_dkjgtn.png')]">
      {/* Outer container for the app with full screen height, centered content, padding, and a background image */}

      <div className="absolute inset-0 bg-black opacity-50 top-0 left-0 w-full h-full"></div>
      {/* Overlay layer with black background and 50% opacity for the dimming effect */}

      <h1 className="text-3xl font-bold mb-4 text-center relative z-10 text-white">
        User Management Dashboard
      </h1>
      {/* Heading of the app: "User Management Dashboard" styled to be centered, bold, white, and on top of the overlay */}

      <UserList />
      {/* UserList component is responsible for displaying the list of users, allowing editing, adding, and deleting users */}

      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={true}
      />
      {/* ToastContainer for displaying toast notifications. Positioned at the top-center, auto closes after 500ms, without a progress bar */}
    </div>
  );
}

export default App;
// Export the App component so it can be used in other parts of the application
