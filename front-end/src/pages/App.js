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
// import ResetPassword from "./ResetPassword";

/*personal note: we need to pop in a condidition here...
if logged in..redirect to / (home), else redirect back to login */

function App() {
  // null =  not loggedin, username = loggedin
  const [user, setUser] = useState(null);

  // 2 routes; login and /
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Container />,
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
          // loggedin username is communicated to app, now the condition part needs to be done
          element: <Login communicateLogin={(username) => setUser(username)} />,
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
