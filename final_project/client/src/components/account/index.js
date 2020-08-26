import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

import Header from "../header";
import Garden from "../garden";
import Nursery from "../nursery";

const Account = () => {
  const { userData, loggedIn } = useSelector((state) => state.userReducer);
  console.log(userData);
  console.log(loggedIn);
  return (
    <>
      {loggedIn && (
        <>
          <Header />
          <Nursery />
          <Garden />
        </>
      )}
      {!loggedIn && <Redirect to="/" />}
    </>
  );
};

export default Account;
