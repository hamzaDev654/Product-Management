import React from "react";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import MainIndex from "./components/Products/MainIndex";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", index: true, element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/registration", element: <Register /> },
        { path: "/products", element: <MainIndex /> },
      ],
    },
  ]);
  return (
    <RouterProvider router={router} />

  );
}

export default App;
