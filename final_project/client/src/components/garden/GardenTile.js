import React, { useRef, useEffect } from "react";
import styled from "styled-components";

import { GARDEN_TILE_SIZE } from "../../constants";
import { useSelector } from "react-redux";

const GardenTile = ({ tileObj }) => {
  const tileEle = useRef(null);
  const { diggingSpot } = useSelector((state) => state.gardenReducer);
  const plantsStatus = useSelector((state) => state.plantsReducer.status);
  if (tileEle.current !== null && plantsStatus === "ready")
    console.log(tileEle.current.offsetTop);

  useEffect(() => {
    console.log(diggingSpot);
    if (diggingSpot)
      console.log(document.elementsFromPoint(diggingSpot.x, diggingSpot.y));
  }, [diggingSpot]);

  return (
    <StyledCol ref={tileEle} tileObj={tileObj}>
      {}
    </StyledCol>
  );
};

const StyledCol = styled.div`
  border: 1px brown dashed;
  width: ${GARDEN_TILE_SIZE}px;
  height: ${GARDEN_TILE_SIZE}px;
  background-color: ${(props) =>
    props.tileObj && !props.tileObj.planted ? "black" : "white"};
`;

export default GardenTile;
