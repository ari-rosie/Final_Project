import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "react-icons-kit";
import { deleteOutline } from "react-icons-kit/typicons/deleteOutline";

import { COLORS } from "../../constants";
import { toggleModalShowing } from "../../actions";

const Modal = () => {
  const dispatch = useDispatch();
  const { content, isShowing, contentType, extraContent } = useSelector(
    (state) => state.modalReducer
  );
  return (
    <>
      {isShowing && (
        <Wrapper>
          <LeftDiv extraContent={extraContent}>
            <Icon
              icon={deleteOutline}
              color={COLORS.light_mint}
              onClick={() => dispatch(toggleModalShowing(""))}
            />
            <h2>{contentType}</h2>
            <div>{content}</div>
          </LeftDiv>
          {extraContent && <ContentDiv>{extraContent}</ContentDiv>}
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 70%;
  height: auto;
  border: 1px solid ${COLORS.dark_teal};
  border-radius: 8px;
  background-color: rgba(245, 245, 245, 0.8);
  position: fixed;
  top: 50px;
  left: 15%;
  color: ${COLORS.dark_teal};
  font-size: 1em;
  padding: 10px 20px;
  margin-top: 10px;
  display: flex;

  h2 {
    color: ${COLORS.tomato};
  }
`;

const LeftDiv = styled.div`
  width: ${(props) => (props.extraContent ? "40%" : "100%")};
`;

const ContentDiv = styled.div`
  background-color: #9370db;
  color: whitesmoke;
  border-radius: 8px;
  margin-left: 20px;
  padding: 10px;
  max-width: 60%;
`;

export default Modal;
