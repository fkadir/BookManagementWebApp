import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "../components/Navbar.jsx";
import BooksList from "../components/AllBooks/BooksList";

function App() {
  return (
    <div className="App">
      <div className="navbar">
        {" "}
        <NavbarComp />
      </div>
      <div className="status-cr"></div>
      <div>
        <BooksList />
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
