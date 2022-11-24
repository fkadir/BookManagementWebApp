import NavbarComp from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";

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
