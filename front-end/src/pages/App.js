import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Home from "./Home";
import Container from "./Container";
import MyBooks from "./MyBooks";
import AccountManage from "./AccountManage";
import { useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
// import Protected from "./Protected";

/*Page protection code adapted from https://www.makeuseof.com/create-protected-route-in-react/*/

function App() {
  // null =  not loggedin, username = loggedin
  let [user, setUser] = useState(null);

  // 2 routes; login and /
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        // <Protected isLoggedIn={user}>
        <Container />
        // </Protected>
      ),
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "my-books",
          element: <MyBooks />,
        },
        {
          path: "account-manage",
          element: <AccountManage />,
        },
      ],
    },
    {
      path: "/login",
      element: <Outlet />,
      children: [
        {
          path: "",
          // loggedin username is communicated to app
          element: (
            <Login
              communicateLogin={(username) => {
                setUser(username);
              }}
            />
          ),
        },
        {
          path: "forgot",
          element: <ForgotPassword />,
        },
        {
          path: "reset/:id",
          element: <ResetPassword />,
        },
      ],
    },
    {},
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
