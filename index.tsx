import "./style.css";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Find root element
const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container missing in index.html");
}

// Create React root
const root = createRoot(container);

// Render App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
