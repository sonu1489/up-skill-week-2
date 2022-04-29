import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
const main = document.getElementById("root");
if (main) {
  const root = ReactDOM.createRoot(main);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
