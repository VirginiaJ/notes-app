import { Outlet } from "react-router-dom";
import Navigation from "src/components/Navigation";

const Layout = () => (
  <div>
    <Navigation />
    <Outlet />
  </div>
);

export default Layout;
