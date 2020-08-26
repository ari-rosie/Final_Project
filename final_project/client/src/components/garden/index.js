import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import {
  GARDEN_TILE_SIZE,
  GARDEN_HEIGHT,
  GARDEN_WIDTH,
  GARDEN_WRAPPER_WIDTH,
} from "../../constants";
import { createMyGarden } from "../../actions";
import GardenTile from "./GardenTile";

const col_tiles = GARDEN_WIDTH / 2;
const row_tiles = GARDEN_HEIGHT / 2;

let col = [];
let row = [];

for (let i = 0; i < col_tiles; i++) col.push(i);
for (let i = 0; i < row_tiles; i++) row.push(i);

const Garden = () => {
  const dispatch = useDispatch();
  const { garden, diggingSpot } = useSelector((state) => state.gardenReducer);

  useEffect(() => {
    for (const r in row)
      for (const c in col) {
        let tileObj = {
          id: `${r}-${c}`,
          planted: false,
        };
        dispatch(createMyGarden(tileObj));
      }
  }, []);

  const getTile = (r, c) => {
    const tile = garden.find((tile) => tile.id === `${r}-${c}`);
    return tile;
  };

  useEffect(() => {
    console.log(diggingSpot);
    if (diggingSpot)
      console.log(document.elementsFromPoint(diggingSpot.x, diggingSpot.y));
  }, [diggingSpot]);

  return (
    <Wrapper>
      <h1>My Garden</h1>
      <div>
        {row.map((r) => {
          return (
            <StyledRow key={`garden-row-${r}`}>
              {col.map((c) => {
                return (
                  <GardenTile
                    key={`garden-tile-${r}-${c}`}
                    tileObj={garden.length > 0 ? getTile(r, c) : null}
                    tileId={`${r}-${c}`}
                  />
                );
              })}
            </StyledRow>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: scroll;
`;

const StyledRow = styled.div`
  width: ${GARDEN_WRAPPER_WIDTH}px;
  display: flex;
`;

const StyledCol = styled.div`
  border: 1px brown dashed;
  width: ${GARDEN_TILE_SIZE}px;
  height: ${GARDEN_TILE_SIZE}px;
  background-color: ${(props) =>
    props.tileObj && !props.tileObj.planted ? "black" : "white"};
`;

export default Garden;
