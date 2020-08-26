import React, { useState } from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import { useSelector, useDispatch } from "react-redux";
import { setDiggingSpot } from "../../actions";

const Plant = ({ name, image_url }) => {
  const dispatch = useDispatch();
  const [diggingPosition, setDiggingPosition] = useState(null);
  const { diggingSpot } = useSelector((state) => state.gardenReducer);

  const handleDrag = (e) => {
    setDiggingPosition({
      x: e.screenX,
      y: e.screenY,
    });
  };

  const handleDragStop = (e) => {
    dispatch(setDiggingSpot(diggingPosition.x, diggingPosition.y));
    console.log(diggingSpot);
  };
  return (
    <Draggable
      handle=".drag"
      defaultPosition={{ x: 0, y: 0 }}
      position={diggingSpot ? { x: 0, y: 0 } : null}
      grid={[5, 5]}
      scale={1}
      // onStart={this.handleStart}
      onDrag={(e) => handleDrag(e)}
      onStop={(e) => handleDragStop(e)}
    >
      <Wrapper
        src={`https://res-2.cloudinary.com/do6bw42am/image/upload/c_scale,f_auto,h_300/v1/${image_url}`}
        className="drag"
      >
        <p className="drag">{name}</p>
      </Wrapper>
    </Draggable>
  );
};

const Wrapper = styled.div`
  width: 100px;
  height: 100px;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: contain;
`;

export default Plant;
