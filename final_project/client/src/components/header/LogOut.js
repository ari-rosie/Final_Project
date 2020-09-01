import React from "react";
import { useDispatch, useSelector } from "react-redux";

import UnstyledButton from "../UnstyledButton";
import { logOutCurrentUser } from "../../actions";

const LogOut = () => {
  const dispatch = useDispatch();
  const { garden } = useSelector((state) => state.gardenReducer);
  const { userData } = useSelector((state) => state.userReducer);

  const handleLogOut = async () => {
    const bod = {
      newGarden: garden,
      email: userData.email,
    };
    const reqObj = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bod),
    };

    try {
      const send = await fetch("/user/update-garden", reqObj);
      const res = await send.json();
      if (res.status === 201) console.log("success");
    } catch (error) {
      console.log(error);
    }

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
