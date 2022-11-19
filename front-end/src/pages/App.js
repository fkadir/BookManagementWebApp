import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "../components/Navbar.jsx";
import BooksList from "../components/AllBooks/BooksList";
import CrSideBar from "../components/MyBooks/CrSideBar";

function App() {
  return (
    <div className="App">
      <NavbarComp />
      <CrSideBar />
      <BooksList />
      {/* <div className="footer"></div> */}
    </div>
  );
}

export default App;
