import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// code adapted from https://www.makeuseof.com/create-protected-route-in-react/ and https://dev.to/salarc123/mern-stack-authentication-tutorial-part-2-the-frontend-gen

//I'm so fk confused gonna ask him tomorrow I think
const Protected = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3100/users/isUserAuth`, {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.isLoggedIn);
        if (data.isLoggedIn) {
          console.log("true what");
          setIsLogin(true);
          console.log(isLogin);
        } else {
          console.log("false what");
        }
        console.log(isLogin);
      });
  });

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default Protected;
