import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { requestAllPlants, receiveAllPlants } from "../../actions";
import Plant from "./Plant";

const Nursery = () => {
  const dispatch = useDispatch();
  const { plants, status } = useSelector((state) => state.plantsReducer);

  useEffect(() => {
    dispatch(requestAllPlants());
    fetch("/plants/all")
      .then((res) => res.json())
      .then((res) => dispatch(receiveAllPlants(res.data)));
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      {/* {status === "loading" && <Loading />} */}
      {status === "ready" && (
        <PlantsContainer>
          {JSON.parse(plants).map((plant) => (
            <Plant
              name={plant.name}
              image_url={plant.image_url}
              key={`nursery-plant-${plant.name}`}
              spacing={plant.spacing}
            />
          ))}
        </PlantsContainer>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 50px;
`;

const PlantsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default Nursery;
