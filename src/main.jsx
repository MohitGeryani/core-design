// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import './index.css';
import { TaskProvider } from "./context/TaskContext";

ReactDOM.createRoot(document.getElementById("root")).render(

    <BrowserRouter>
    <TaskProvider>


      <App />
    </TaskProvider>
    </BrowserRouter>
 
);
