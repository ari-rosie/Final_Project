import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import {
  GARDEN_TILE_SIZE,
  GARDEN_HEIGHT,
  GARDEN_WIDTH,
  GARDEN_WRAPPER_WIDTH,
  COLORS,
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
  const { garden } = useSelector((state) => state.gardenReducer);
  let tileIndex = 0;

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
      <GardenContainer>
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
      </GardenContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: scroll;
  margin-top: 20%;
  background-image: url(${require("../../assets/black-soil-2.png")});
  background-size: cover;
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const StyledRow = styled.div`
  width: ${GARDEN_WRAPPER_WIDTH}px;
  display: flex;
`;

const GardenContainer = styled.div``;
export default Garden;
