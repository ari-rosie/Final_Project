import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { requestAllPlants, receiveAllPlants } from "../../actions";
import Plant from "./Plant";
import Modal from "../modal";

const Nursery = () => {
  const dispatch = useDispatch();
  const { plants, status } = useSelector((state) => state.plantsReducer);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 10,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };

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
        <Carousel responsive={responsive}>
          {JSON.parse(plants).map((plant) => (
            <Plant
              name={plant.name}
              image_url={plant.image_url}
              key={`nursery-plant-${plant.name}`}
              spacing={plant.spacing}
              id={plant.id}
              description={plant.description}
              draggable="true"
            />
          ))}
        </Carousel>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 50px;
  width: 100%;
  height: 200px;
  position: fixed;
  left: 0;
`;

export default Nursery;
