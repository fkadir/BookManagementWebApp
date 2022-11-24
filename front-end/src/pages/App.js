import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Home from "./Home";
import Container from "./Container";
import MyBooks from "./MyBooks";
import AccountManage from "./AccountManage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
      // loggedin username is communicated to app, now the condition part needs to be done
      element: <Login communicateLogin={(username) => setUser(username)} />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
