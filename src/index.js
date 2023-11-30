import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js"

const container = document.getElementById('root');
// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render
root.render(
  <App></App>
);