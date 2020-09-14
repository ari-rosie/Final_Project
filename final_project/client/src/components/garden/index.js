import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import {
  GARDEN_TILE_SIZE,
  COLORS,
  TILE_SIZE_REPRESENTATION,
} from "../../constants";
import {
  createMyGarden,
  setGardenStatus,
  copyGardenFromDb,
} from "../../actions";
import GardenTile from "./GardenTile";

let col = [];
let row = [];

const Garden = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.gardenReducer);
  const { GARDEN_HEIGHT, GARDEN_WIDTH } = useSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    const col_tiles = GARDEN_WIDTH / TILE_SIZE_REPRESENTATION;
    const row_tiles = GARDEN_HEIGHT / TILE_SIZE_REPRESENTATION;

    for (let i = 0; i < col_tiles; i++) col.push(i);
    for (let i = 0; i < row_tiles; i++) row.push(i);
  }, []);

  let tileIndex = -1;
  return (
    <Wrapper>
      {status === "ready" && (
        <GardenContainer>
          {row.map((r) => {
            return (
              <StyledRow
                key={`garden-row-${r}`}
                width={
                  (GARDEN_WIDTH / TILE_SIZE_REPRESENTATION) * GARDEN_TILE_SIZE
                }
              >
                {col.map((c) => {
                  tileIndex++;
                  return (
                    <GardenTile
                      key={`garden-tile-${r}-${c}`}
                      tileId={`${r}-${c}`}
                      index={tileIndex}
                    />
                  );
                })}
              </StyledRow>
            );
          })}
        </GardenContainer>
      )}
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
  width: ${(props) => props.width}px;
  display: flex;
`;

const GardenContainer = styled.div``;
export default Garden;
