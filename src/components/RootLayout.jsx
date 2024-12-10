import { Outlet } from "react-router-dom";
import MainNavigation from "./Header";

function RootLayout({isLoggedIn,isInRole}) {
  return (
    <>
      <MainNavigation isLoggedIn = {isLoggedIn} isInRole={isInRole} />
      <Outlet />
    </>
  );
}

export default RootLayout;
