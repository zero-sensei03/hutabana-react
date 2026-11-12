import { Button } from "@/components/ui/button";
import LogoLight from "@/assets/images/logo-light.webp";
import { NavbarMenu } from "@/constants/NavMenu";
import { Link, useLocation, useNavigate } from "react-router";
import { cn } from "cn";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isActiveMenu = (key: string, url: string) => {
    if (key == "home") {
      if (location.pathname == "/") {
        return true;
      }
    } else {
      return location.pathname == url;
    }
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogin = () => {
    setIsDropdownOpen(false);
    navigate("/auth/sign-in");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsDropdownOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="bg-white shadow-sm py-2 px-2 fixed w-full z-50">
      <div className="max-w-350 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={LogoLight} alt="" width={50} />
            <div className="leading-5 pacifico-regular">
              <p className="">MeiFa</p>
              <p className="ms-4">Laboratories</p>
            </div>
          </div>
          <div className="lg:flex hidden items-center space-x-4">
            {NavbarMenu.map((item) => (
              <Link
                key={item.key}
                to={item.url}
                className={cn(
                  "text-base duration-200 py-1 px-3 border-b-2 border-transparent hover:text-primary/80 hover:border-primary",
                  {
                    "text-primary font-semibold border-primary": isActiveMenu(
                      item.key,
                      item.url,
                    ),
                  },
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <Button
            size={"lg"}
            className={cn(
              "text-white cursor-pointer px-4 rounded-md lg:block hidden",
            )}
            onClick={handleLogin}
          >
            Login to portal
          </Button>
          <Button
            size={"icon"}
            className={cn(
              "rounded-sm p-4 bg-secondary border border-primary text-primary lg:hidden hover:text-white cursor-pointer",
            )}
            onClick={handleToggleDropdown}
            aria-expanded={isDropdownOpen}
          >
            {isDropdownOpen ? <X /> : <Menu />}
          </Button>
        </div>

        <div
          className={cn(
            "grid transition-all duration-300 ease-in-out lg:hidden",
            isDropdownOpen
              ? "grid-rows-[1fr] opacity-100"
              : "pointer-events-none grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-1 border-border pt-3 pb-2">
              {NavbarMenu.map((item) => (
                <Link
                  key={item.key}
                  to={item.url}
                  onClick={() => setIsDropdownOpen(false)}
                  className={cn(
                    "rounded-md px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary hover:text-primary",
                    {
                      "bg-secondary text-primary": isActiveMenu(
                        item.key,
                        item.url,
                      ),
                    },
                  )}
                >
                  {item.name}
                </Link>
              ))}

              <Button
                size="lg"
                className="mt-2 py-4 w-full cursor-pointer text-white"
                onClick={handleLogin}
              >
                Login to portal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
