import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "react-icons-kit";
import { u1F33E } from "react-icons-kit/noto_emoji_regular/u1F33E";
import { squirrel } from "react-icons-kit/oct/squirrel";
import { u1F34E } from "react-icons-kit/noto_emoji_regular/u1F34E";

import { GARDEN_TILE_SIZE, COLORS } from "../../constants";
import {
  updateGardenTile,
  targetGardenTiles,
  toggleModalShowing,
  deleteGardenTiles,
  addExtraContent,
} from "../../actions";
import { getSpacingTilesArray, getPlantObjById } from "../../utilities";
import UnstyledButton from "../UnstyledButton";

const GardenTile = ({ index }) => {
  const dispatch = useDispatch();
  const { garden, status, target } = useSelector(
    (state) => state.gardenReducer
  );
  const { plantTarget, plants } = useSelector((state) => state.plantsReducer);
  const { GARDEN_WIDTH, GARDEN_HEIGHT } = useSelector(
    (state) => state.userReducer
  );

  const handleDeletePlant = () => {
    const tilesArray = getSpacingTilesArray(
      plantTarget.spacing,
      index,
      GARDEN_WIDTH,
      GARDEN_HEIGHT
    );
    dispatch(deleteGardenTiles(index, tilesArray));
    dispatch(toggleModalShowing({}, ""));
  };

  const handleDrop = (e) => {
    if (!garden[index].planted && !garden[index].spacing) {
      e.preventDefault();

      const plantObj = JSON.parse(e.dataTransfer.getData("plantObj"));
      const tilesArray = getSpacingTilesArray(
        plantObj.spacing,
        index,
        GARDEN_WIDTH,
        GARDEN_HEIGHT
      );
      dispatch(updateGardenTile(plantObj, index, tilesArray));
    }
    dispatch(targetGardenTiles([]));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    const tilesArray = getSpacingTilesArray(
      plantTarget.spacing,
      index,
      GARDEN_WIDTH,
      GARDEN_HEIGHT
    );
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
          onClick={() => {
            if (garden[index].planted) {
              dispatch(
                toggleModalShowing(
                  <ModalWrapper>
                    <BtnDiv>
                      <UnstyledButton onClick={() => handleDeletePlant()}>
                        <Icon icon={squirrel} /> delete this plant.
                      </UnstyledButton>
                      <UnstyledButton
                        onClick={() =>
                          dispatch(
                            addExtraContent(
                              getPlantObjById(
                                garden[index].plant.id,
                                JSON.parse(plants)
                              ).when_to_plant
                            )
                          )
                        }
                      >
                        <Icon icon={u1F33E} /> WHEN TO PLANT.
                      </UnstyledButton>
                      <UnstyledButton
                        onClick={() =>
                          dispatch(
                            addExtraContent(
                              getPlantObjById(
                                garden[index].plant.id,
                                JSON.parse(plants)
                              ).harvesting
                            )
                          )
                        }
                      >
                        <Icon icon={u1F34E} /> WHEN TO HARVEST.
                      </UnstyledButton>
                    </BtnDiv>
                  </ModalWrapper>,
                  garden[index].plant.name
                )
              );
            }
          }}
        >
          {garden[index].spacing && <Icon icon={u1F33E} size={20} />}
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
  background-color: ${(props) =>
    (props.target && COLORS.title_green) ||
    (props.spacing && COLORS.tomato) ||
    "none"};
  background-image: ${(props) => (props.planted ? props.image : "none")};
  border-radius: ${(props) => (props.planted ? "4px" : "0px")};
  background-size: cover;
  transform: ${(props) => (props.planted ? "scale(3)" : "none")};
  color: whitesmoke;
`;

const ModalWrapper = styled.div``;

const BtnDiv = styled.div`
  border-right: 2px solid ${COLORS.title_green};
`;

export default GardenTile;
