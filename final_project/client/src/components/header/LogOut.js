import React from "react";
import { useDispatch } from "react-redux";

import UnstyledButton from "../UnstyledButton";
import { logOutCurrentUser } from "../../actions";

const LogOut = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOutCurrentUser());
  };

  return (
    <>
      <UnstyledButton onClick={() => handleLogOut()}>
        LOG OUT
        <img src={require("../../assets/sunflower_PNG13389.png")} />
      </UnstyledButton>
    </>
  );
};

export default LogOut;
