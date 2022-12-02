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
import Protected from "./Protected";

/*Page protection code adapted from https://www.makeuseof.com/create-protected-route-in-react/*/

function App() {
  // 2 routes; login and /

  // protected thing
  // const userAuth = () => {
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
  //   return newState;
  // };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        //  <Protected>
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
