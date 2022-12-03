import React, { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";

// code adapted from https://www.makeuseof.com/create-protected-route-in-react/ and https://dev.to/salarc123/mern-stack-authentication-tutorial-part-2-the-frontend-gen

const Protected = ({ props, children }) => {
  const [isLogin, setIsLogin] = useState(false);
  // solutionf from: https://stackoverflow.com/questions/68050183/how-to-run-code-in-react-function-component-before-first-render-like-in-the-con
  // const initializedRef = useRef(false);
  // if (!initializedRef.current) {
  //   initializedRef.current = true;

  //   var newState;
  //   fetch(`http://localhost:3100/users/isUserAuth`, {
  //     method: "GET",
  //     headers: {
  //       "x-access-token": localStorage.getItem("token"),
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.isLoggedIn);
  //       if (data.isLoggedIn) {
  //         console.log("true what");
  //         newState = true;
  //       } else {
  //         console.log("false what");
  //       }
  //     });
  //   console.log(newState);
  //   setIsLogin(newState);
  // }

  // useEffect(() => {});

  if (!isLogin) {
    console.log(props);
    console.log("!isLogin");
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default Protected;
