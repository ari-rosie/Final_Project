import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { GARDEN_TILE_SIZE, COLORS } from "../../constants";
import { updateGardenTile, targetGardenTiles } from "../../actions";
import {
  getTilesSpace,
  getNumberFromString,
  getSpacingTilesArray,
} from "../../utilities";

const GardenTile = ({ index }) => {
  const dispatch = useDispatch();
  const { garden, status, target, targetAvailable } = useSelector(
    (state) => state.gardenReducer
  );
  const { plantTarget } = useSelector((state) => state.plantsReducer);

  const handleDrop = (e) => {
    if (!garden[index].planted && !garden[index].spacing) {
      e.preventDefault();

      const plantObj = JSON.parse(e.dataTransfer.getData("plantObj"));

      const tileSpace = getTilesSpace(getNumberFromString(plantObj.spacing));
      const tilesArray = getSpacingTilesArray(tileSpace, index);
      dispatch(updateGardenTile(plantObj, index, tilesArray));
    }
    dispatch(targetGardenTiles([]));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    const tileSpace = getTilesSpace(getNumberFromString(plantTarget.spacing));
    const tilesArray = getSpacingTilesArray(tileSpace, index);

    dispatch(targetGardenTiles(tilesArray));
  };

  const handleDragLeave = (e) => {};

  return (
    <>
      {status === "ready" && (
        <StyledCol
          onDrop={(e) => handleDrop(e)}
          onDragOver={
            !garden[index].planted && !garden[index].spacing
              ? handleDragOver
              : null
          }
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          planted={garden[index].planted}
          spacing={garden[index].spacing}
          target={target.includes(index) ? true : false}
          image={garden[index].plant ? `url(${garden[index].plant.img})` : null}
        />
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
  background-color: ${(props) =>
    (props.target && COLORS.light_mint) ||
    (props.spacing && COLORS.tomato) ||
    "#FFF5EE"};
  background-image: ${(props) => (props.planted ? props.image : "none")};
  background-size: cover;
  transform: ${(props) => (props.planted ? "scale(3)" : "none")};
`;

export default GardenTile;
