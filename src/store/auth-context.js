import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext({
  userData: [],
  isLoggedIn: false,
  isModalOpen: {},
  onCloseModal: () => {},
  onModalShowHandler: () => {},
  onLogout: () => {},
  onLogin: (loginValue) => {},
  onRegistration: (registerationValue) => {},
});

export const AuthContextProvider = (props) => {
  const navigate = useNavigate();
  let initialData = { prodId: "", isOpen: false, type: "" };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setModalOpen] = useState(initialData);

  useEffect(() => {
    const storedUserLoggedInInformation = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    if (storedUserLoggedInInformation?.isUserLoggedIn === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const onCloseModal = () => {
    setModalOpen(initialData);
  };
  const onModalShowHandler = (prodId, type) => {
    setModalOpen({ prodId, isOpen: true, type });
  };

  const loginHandler = (formValue) => {
    const { username } = formValue;
    let storeUser = {
      username,
      isUserLoggedIn: "1",
    };
    localStorage.setItem("loggedInUser", JSON.stringify(storeUser));
    setIsLoggedIn(true);
  };

  const onRegistration = (registerValue) => {
    const oldData = JSON.parse(localStorage.getItem("registerUser"));

    localStorage.setItem(
      "registerUser",
      JSON.stringify(
        Array.isArray(oldData) ? [...oldData, registerValue] : [registerValue]
      )
    );
  };

  const logoutHandler = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    navigate("/");
  };

  let Data = JSON.parse(localStorage.getItem("registerUser"));
  let userData = Data ? Data : [];
  return (
    <AuthContext.Provider
      value={{
        userData,
        isLoggedIn,
        isModalOpen,
        onModalShowHandler,
        onCloseModal,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onRegister: onRegistration,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
