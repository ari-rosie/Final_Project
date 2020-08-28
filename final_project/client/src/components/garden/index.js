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
  let tileIndex = 0;

  console.log(garden);
  useEffect(() => {
    for (const r in row)
      for (const c in col) {
        let tileObj = {
          _id: `${r}-${c}`,
          planted: false,
          spacing: false,
        };
        dispatch(createMyGarden(tileObj));
      }
  }, []);

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
                    tileId={`${r}-${c}`}
                    index={tileIndex++}
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
  margin-top: 20%;

  h1 {
    color: #228b22;
    margin-bottom: 15px;
  }
`;

const StyledRow = styled.div`
  width: ${GARDEN_WRAPPER_WIDTH}px;
  display: flex;
`;

export default Garden;
