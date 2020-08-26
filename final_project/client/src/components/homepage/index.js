import React from "react";

import Login from "./Login";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

const Homepage = () => {
  const { loggedIn } = useSelector((state) => state.userReducer);
  return (
    <>
      {loggedIn && <Redirect to="/account" />}
      {!loggedIn && <Login />}
    </>
  );
};

export default Homepage;
