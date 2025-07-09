import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ui/ScrollToTop";

const Layout = () => {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
