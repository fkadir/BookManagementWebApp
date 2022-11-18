import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/App.js";
// import AccountManage from "./pages/AccountManage";
// import Login from "./pages/Login";
// import MyBooks from "./pages/MyBooks";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <Login />
    <AccountManage />
    <MyBooks /> */}
  </React.StrictMode>
);
