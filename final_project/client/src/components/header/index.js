import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <NavBar>
        <LogOut />
        <UnstyledButton onClick={() => dispatch(togglePlantsMenuContent())}>
          Vegetables
          <img src={require("../../assets/sunflower_PNG13389.png")} />
        </UnstyledButton>
        <UnstyledButton onClick={() => dispatch(toggleSummaryMenuContent())}>
          My plants summary
          <img src={require("../../assets/sunflower_PNG13389.png")} />
        </UnstyledButton>
      </NavBar>
      <MenuContent />
      <Modal />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
`;

const NavBar = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  display: flex;
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
  }

  img {
    height: 20px;
    visibility: hidden;
    margin-left: 10px;
  }
`;

export default Header;
