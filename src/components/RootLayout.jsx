import { Outlet } from "react-router-dom";
import MainNavigation from "./Header";

function RootLayout({ isLoggedIn, isInRole,handleLogout }) {
  return (
    <>
      <MainNavigation isLoggedIn={isLoggedIn} isInRole={isInRole} handleLogout = {handleLogout} />
      <Outlet/>
    </>
  );
}

export default RootLayout;
