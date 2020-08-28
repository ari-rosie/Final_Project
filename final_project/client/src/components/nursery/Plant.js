import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { COLORS } from "../../constants";

const Plant = ({ name, image_url, spacing }) => {
  const plantObj = {
    name: name,
    img: `https://res-2.cloudinary.com/do6bw42am/image/upload/c_scale,f_auto,h_300/v1/${image_url}`,
    spacing,
  };
  const handleDragStart = (e) => {
    e.dataTransfer.setData("plantObj", JSON.stringify(plantObj));
  };

  const handleDragOver = (e) => {
    e.stopPropagation();
  };

  return (
    <Wrapper
      src={`https://res-2.cloudinary.com/do6bw42am/image/upload/c_scale,f_auto,h_300/v1/${image_url}`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
    >
      <p>{name}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 200px;
  height: 30px;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  color: ${COLORS.light_mint};
  text-align: center;
  font-size: 0.8em;

  p {
    background-color: ${COLORS.dark_teal};
  }
  &:hover {
    transform: scale(1.5);
    border-radius: 8px;
  }
  &:hover p {
    background-color: rgba(47, 79, 79, 0.5);
  }
`;

export default Plant;
