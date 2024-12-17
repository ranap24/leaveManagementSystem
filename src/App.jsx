import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login, { action as loginAction } from "./components/Employee/Login";
import Register, {
  action as registerAction,
  loader as loaderAction,
} from "./components/Employee/Register";
import RootLayout from "./components/RootLayout";
import { useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import ApplyLeave, {
  loader as formLoader,
} from "./components/Leave/ApplyLeave";
import EditLeave, { loader as editLoader } from "./components/Leave/EditLeave";
import ListLeave, { loader as listLoader } from "./components/Leave/ListLeave";
import { action as formAction } from "./components/Leave/LeaveApplication";
import ManageUsers, {
  loader as userLoader,
} from "./components/Employee/ManageUsers";
import ManagerLeaves, {
  loader as managerLeavesLoader,
} from "./components/Leave/ManagerLeaves";
import { Toaster } from "react-hot-toast";
import ErrorPage from "./components/ErrorPage";

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
          <RootLayout
            isLoggedIn={isLoggedIn}
            isInRole={isInRole}
            handleLogout={handleLogout}
          />
        </div>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
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
          path: "/listUsers",
          element: <ManageUsers isLoggedIn={isLoggedIn} isInRole={isInRole} />,
          loader: userLoader,
        },
        {
          path: "/editUser/:empId",
          element: (
            <Register
              isLoggedIn={isLoggedIn}
              isInRole={isInRole}
              method="PUT"
            />
          ),
          loader: loaderAction,
          action: registerAction,
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
          element: <EditLeave isLoggedIn={isLoggedIn} />,
          loader: editLoader,
          action: formAction,
        },
        {
          path: "/managerLeaves",
          element: <ManagerLeaves isLoggedIn = {isLoggedIn}/>,
          loader: managerLeavesLoader,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
