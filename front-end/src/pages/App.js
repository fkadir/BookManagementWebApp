import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "../components/Navbar.jsx";
import BooksList from "../components/AllBooks/BooksList";
import CrSideBar from "../components/MyBooks/CrSideBar";
import CreateUser from "../components/Users/CreateUser";
import Login from "./Login";

function App() {
  return (
    <div className="App">
      {/* <NavbarComp />
      <CrSideBar />
      <BooksList /> */}
      <Login />
      {/* <div className="footer"></div> */}
    </div>
  );
}

export default App;
