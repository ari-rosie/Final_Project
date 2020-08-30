import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { UseGetPlantObjById } from "../../hooks";
import Plant from "../nursery/Plant";
import Modal from "../modal";

const Summary = () => {
  const { summary } = useSelector((state) => state.gardenReducer);
  return (
    <Wrapper>
      {summary.map((id) => {
        const plant = UseGetPlantObjById(id);
        return (
          <Plant
            name={plant.name}
            image_url={plant.image_url}
            key={`nursery-plant-${plant.name}`}
            spacing={plant.spacing}
            id={plant.id}
            description={plant.description}
            draggable="false"
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
`;

export default Summary;
