import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { infoOutline } from "react-icons-kit/typicons/infoOutline";

import { COLORS } from "../../constants";
import { toggleModalShowing, setPlantOnDrag } from "../../actions";

const Plant = ({ name, image_url, spacing, id, description, draggable }) => {
  const dispatch = useDispatch();
  const plantObj = {
    name: name,
    img: `https://res-2.cloudinary.com/do6bw42am/image/upload/c_scale,f_auto,h_300/v1/${image_url}`,
    spacing,
    id,
  };
  const handleDragStart = (e) => {
    console.log("plant drag.........");
    e.dataTransfer.setData("plantObj", JSON.stringify(plantObj));
    dispatch(setPlantOnDrag(plantObj));
  };

  const handleDragOver = (e) => {
    e.stopPropagation();
  };

  return (
    <Wrapper
      src={`https://res-2.cloudinary.com/do6bw42am/image/upload/c_scale,f_auto,h_300/v1/${image_url}`}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
    >
      <p>
        {name}
        <StyledIcon
          icon={infoOutline}
          color={COLORS.light_mint}
          size={10}
          onClick={() =>
            dispatch(toggleModalShowing(description, "description:"))
          }
        />
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 150px;
  height: 50px;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  color: ${COLORS.light_mint};
  text-align: center;
  font-size: 0.8em;
  overflow: hidden;
  @media (max-width: 768px) {
    height: 30px;
  }

  p {
    background-color: ${COLORS.dark_teal};
    padding: 5px 0;
  }
  &:hover p {
    background-color: rgba(47, 79, 79, 0.5);
    transform: scale(1.5);
  }
`;

const StyledIcon = styled(Icon)`
  padding-left: 20px;
`;

export default Plant;
