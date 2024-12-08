import { Outlet } from "react-router-dom";
import MainNavigation from "./Header";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
}

export default RootLayout;
