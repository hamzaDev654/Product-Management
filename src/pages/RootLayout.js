import React from "react";
// import Navigation from "../components/MainHeader/Navigation";
import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "../store/auth-context";
import MainHeader from "../components/MainHeader/MainHeader";

const RootLayout = () => {
  return (
    <div>
      <AuthContextProvider>
        <MainHeader />
        <main>
          <Outlet />
        </main>
      </AuthContextProvider>
    </div>
  );
};

export default RootLayout;
