import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login, { action as loginAction } from "./components/Login";
import Register, {
  action as registerAction,
  loader as loaderAction,
} from "./components/Register";
import RootLayout from "./components/RootLayout";
import { useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import Logout from "./components/Logout";
import ApplyLeave, { loader as formLoader } from "./components/ApplyLeave";
import EditLeave, { loader as editLoader } from "./components/EditLeave";
import ListLeave, { loader as listLoader } from "./components/ListLeave";
import { action as formAction } from "./components/LeaveApplication";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInRole, setIsInRole] = useState(null);

  useEffect(() => {
    const Token = localStorage.getItem("Token");
    if (Token) {
      const arrayToken = Token.split(".");
      const tokenPayload = JSON.parse(atob(arrayToken[1]));
      setIsLoggedIn(true);
      setIsInRole(tokenPayload.role);
    }
  }, [isLoggedIn]);

  const handleLogIn = (token) => {
    localStorage.setItem("Token", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("Token");
    setIsLoggedIn(false);
    setIsInRole(null);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="App">
          <RootLayout isLoggedIn={isLoggedIn} isInRole={isInRole} />
        </div>
      ),
      children: [
        {
          path: "/home",
          element: <HomePage isLoggedIn={isLoggedIn} isInRole={isInRole} />,
        },
        {
          path: "/login",
          element: <Login isLoggedIn={isLoggedIn} handleLogIn={handleLogIn} />,
          action: loginAction,
        },
        {
          path: "/register",
          element: <Register isLoggedIn={isLoggedIn} isInRole={isInRole} />,
          loader: loaderAction,
          action: registerAction,
        },
        {
          path : "/listUsers",
          element : <ManageUsers isLoggedIn = {isLoggedIn} isInRole = {isInRole}/>,
          loader : userLoader
        },
        {
          path: "/logout",
          element: (
            <Logout isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          ),
        },
        {
          path: "/leaveList",
          element: <ListLeave isLoggedIn={isLoggedIn} />,
          loader: listLoader,
        },
        {
          path: "/applyLeave",
          element: <ApplyLeave isLoggedIn={isLoggedIn} />,
          loader: formLoader,
          action: formAction,
        },
        {
          path: "/editLeave/:leaveId",
          element: <EditLeave />,
          loader: editLoader,
          action: formAction,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
