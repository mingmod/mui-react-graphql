import { Outlet } from "react-router-dom";
import Navbar from "./elements/Navbar";

export const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}