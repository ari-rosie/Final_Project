import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Nursery from "../nursery";
import Summary from "../summary";

const MenuContent = () => {
  const { plants, summary } = useSelector((state) => state.menuReducer);
  return (
    <Wrapper>
      {plants && <Nursery />}
      {summary && <Summary />}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default MenuContent;
