import { Outlet } from "react-router";
import { Navbar } from "./navbar";
import { SiteFooter } from "./footer";

const LayoutLanding = () => {
  return (
    <main>
      <Navbar />
      <div className="py-16">
        <Outlet />
      </div>
      <SiteFooter />
    </main>
  );
};

export default LayoutLanding;
