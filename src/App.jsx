import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login, { action as loginAction } from "./components/Login";
import Register, { action as registerAction } from "./components/Register";
import RootLayout from "./components/RootLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/login",
          element: <Login />,
          action: loginAction,
        },
        {
          path: "/register",
          element: <Register />,
          action: registerAction,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
