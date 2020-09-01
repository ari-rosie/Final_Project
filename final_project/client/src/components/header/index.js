import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import MenuContent from "./MenuContent";
import LogOut from "./LogOut";
import UnstyledButton from "../UnstyledButton";
import {
  togglePlantsMenuContent,
  toggleSummaryMenuContent,
} from "../../actions";
import Modal from "../modal";
import { COLORS } from "../../constants";

const Header = () => {
  const { userData } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <NavBar>
        <LogOut />
        <UnstyledButton onClick={() => dispatch(togglePlantsMenuContent())}>
          PLANT NURSERY
          <img src={require("../../assets/sunflower_PNG13389.png")} />
        </UnstyledButton>
        <UnstyledButton onClick={() => dispatch(toggleSummaryMenuContent())}>
          MY GARDEN SUMMARY
          <img src={require("../../assets/sunflower_PNG13389.png")} />
        </UnstyledButton>
        <Greeting>
          {`Howdy ${userData.username}!`}
          <img src={require("../../assets/sunflower_PNG13389.png")} />
        </Greeting>
      </NavBar>
      <MenuContent />
      <Modal />
      <h1>My Garden</h1>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  h1 {
    color: ${COLORS.title_green};
    margin: 15px 0 15px 20px;
  }
`;

const NavBar = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: ${COLORS.dark_teal};
  border-bottom: solid ${COLORS.title_green} 1px;
  border-top: solid ${COLORS.title_green} 1px;
  padding: 10px 100px 10px 20px;
  margin-top: 10px;

  button {
    padding-left: 20px;
    outline: none;
    &:hover img {
      visibility: visible;
    }
    img {
      height: 20px;
      visibility: hidden;
      margin-left: 10px;
    }
  }
`;

const Greeting = styled.span`
  color: ${COLORS.lilac};
  text-align: right;
  img {
    height: 20px;
    margin-left: 10px;
    visibility: visible;
    margin-right: 40px;
  }
`;

export default Header;
