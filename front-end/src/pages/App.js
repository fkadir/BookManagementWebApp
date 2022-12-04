import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Home from "./Home";
import Container from "./Container";
import MyBooks from "./MyBooks";
import AccountManage from "./AccountManage";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

function App() {
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
          path: "mybooks",
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
          element: <Login />,
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
