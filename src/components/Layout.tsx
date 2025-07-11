import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ui/ScrollToTop";
import { Footer } from "./Footer";

const Layout = () => {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
