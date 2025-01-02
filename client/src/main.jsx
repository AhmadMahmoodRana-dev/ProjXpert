import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./context/Context.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />

      </ContextProvider>
    </BrowserRouter>
  </StrictMode>
);
