import { useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { useEffect, useState } from "react";
import { handler } from "tailwindcss-animate";
const Navbar = () => {
  const navigate = useNavigate();
  const [screenSize, setScreenSize] = useState<number>(window.screen.width);

  const handleScreenResize = () => {
    setScreenSize(window.screen.width);
  };

  useEffect(() => {
    window.addEventListener("resize", handleScreenResize);
    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  });

  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <img src="/images/logo.jpg" alt="Logo" />
        {screenSize > 540 ? (
          <div className="navbar-navigation">
            <ModeToggle />
            <a href="/">Acasa</a>
            <a href="">Recomandari</a>
            <a href="">Contact</a>
          </div>
        ) : (
          <div className="navbar-navigation">
            <ModeToggle />
            <img
              src="/images/hamburger menu.svg"
              className="hamburger-menu-icon"
              alt="hamburger-menu"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
