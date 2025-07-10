import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"; // Use your custom component
import { ModeToggle } from "./ui/mode-toggle";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react"; // For mobile menu icon

const Navbar = () => {
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth); // Use innerWidth instead of screen.width

  const handleScreenResize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleScreenResize);
    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  }, []); // Add dependency array

  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <img src="/images/Site-logo.png" alt="Logo" />
        {screenSize > 540 ? (
          // Desktop Navigation
          <div className="navbar-navigation">
            <ModeToggle />
            <a href="/">Acasa</a>
            <a href="">Recomandari</a>
            <a href="">Contact</a>
          </div>
        ) : (
          // Mobile Navigation with Dropdown
          <div className="navbar-navigation">
            <ModeToggle />
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">Menu</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute right-0 left-auto origin-top-right !mt-2 w-32 ">
                    <div className="gap-2 w-fit ">
                      <NavigationMenuLink href="/" className="w-auto w-fit">
                        <div className="text-sm font-medium ">Acasa</div>
                      </NavigationMenuLink>
                      <NavigationMenuLink href="" className="w-auto w-fit">
                        <div className="text-sm font-medium ">Recomandari</div>
                      </NavigationMenuLink>
                      <NavigationMenuLink href="" className="w-auto w-fit">
                        <div className="text-sm font-medium ">Contact</div>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
