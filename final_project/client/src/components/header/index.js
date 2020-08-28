import React from "react";
import styled from "styled-components";

import LogOut from "./LogOut";
import DropdownNursery from "./DropdownNursery";

const Header = () => {
  return (
    <Wrapper>
      <LogOut />
      <DropdownNursery />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  display: flex;
`;

export default Header;
