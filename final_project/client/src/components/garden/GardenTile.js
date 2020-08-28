import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { GARDEN_TILE_SIZE } from "../../constants";
import { updateGardenTile } from "../../actions";
import {
  getTilesSpace,
  getNumberFromString,
  getSpacingTilesArray,
} from "../../utilities";

const GardenTile = ({ tileId, index }) => {
  const dispatch = useDispatch();
  const { garden, status } = useSelector((state) => state.gardenReducer);

  const handleDrop = (e) => {
    if (!garden[index].planted && !garden[index].spacing) {
      e.preventDefault();

      const plantObj = JSON.parse(e.dataTransfer.getData("plantObj"));

      const tileSpace = getTilesSpace(getNumberFromString(plantObj.spacing));
      const tilesArray = getSpacingTilesArray(tileSpace, index);
      dispatch(updateGardenTile(plantObj, index, tilesArray));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {status === "ready" && (
        <StyledCol
          onDrop={
            !garden[index].planted && !garden[index].spacing ? handleDrop : null
          }
          onDragOver={
            !garden[index].planted && !garden[index].spacing
              ? handleDragOver
              : null
          }
          planted={garden[index].planted}
          spacing={garden[index].spacing}
          img={garden[index].img}
        >
          {garden[index].planted ? garden[index].plant.name : ""}
        </StyledCol>
      )}
    </>
  );
};

const StyledCol = styled.div`
  border: ${(props) =>
    props.spacing || props.planted
      ? "0.5px solid #8B4513"
      : "0.5px #8B4513 dashed"};
  width: ${GARDEN_TILE_SIZE}px;
  height: ${GARDEN_TILE_SIZE}px;
  overflow: hidden;
  background-color: ${(props) => (props.spacing ? "#FFF0F5" : "#FFF5EE")};
  background-image: ${(props) => (props.planted ? `url(${props.img})` : null)};
`;

export default GardenTile;
