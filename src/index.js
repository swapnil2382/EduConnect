import React from "react";
import ReactDOM from "react-dom/client"; // Use `react-dom/client` in React 18
import App from "./App";
import { AuthProvider } from "./context/AuthContext";  // Import AuthProvider

const root = ReactDOM.createRoot(document.getElementById("root")); // Use createRoot
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
