import React, { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";

// code adapted from https://www.makeuseof.com/create-protected-route-in-react/ and https://dev.to/salarc123/mern-stack-authentication-tutorial-part-2-the-frontend-gen

const Protected = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  async function userAuth() {
    try {
      const res = await fetch(`http://localhost:3100/users/isUserAuth`, {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }).then((response) => response.json());
      return res;
    } catch (error) {
      //error handling
    }
  }

  useEffect(() => {
    userAuth().then((data) => {
      console.log(data.isLoggedIn);
      setIsLogin(data.isLoggedIn);
      console.log(isLogin);
    });
  });

  if (!isLogin) {
    console.log("!isLogin");
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default Protected;
