import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "react-icons-kit";
import { deleteOutline } from "react-icons-kit/typicons/deleteOutline";

import { COLORS } from "../../constants";
import { toggleModalShowing } from "../../actions";

const Modal = () => {
  const dispatch = useDispatch();
  const { content, isShowing, contentType } = useSelector(
    (state) => state.modalReducer
  );
  return (
    <>
      {isShowing && (
        <Wrapper>
          <Icon
            icon={deleteOutline}
            color={COLORS.light_mint}
            onClick={() => dispatch(toggleModalShowing(""))}
          />
          <h2>{contentType}</h2>
          <p>{content}</p>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 60%;
  height: auto;
  border: 1px solid ${COLORS.dark_teal};
  border-radius: 8px;
  background-color: rgba(245, 245, 245, 0.8);
  position: fixed;
  left: 20%;
  color: ${COLORS.dark_teal};
  font-size: 1em;
  padding: 10px 20px;
  margin-top: 10px;

  h2 {
    color: #ff6347;
  }
`;

export default Modal;
