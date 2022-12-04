import NavbarComp from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";

/* like a frame with the navbar and footer, outlet refers to the router ( & the components being rendered to act like pages) */
function Container() {
  return (
    <div>
      <NavbarComp />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Container;
