import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "react-icons-kit";
import { weatherSunny } from "react-icons-kit/typicons/weatherSunny";

import { getPlantObjById } from "../../utilities";
import { COLORS } from "../../constants";
import { toggleModalShowing } from "../../actions";

const Summary = () => {
  console.log("rodeo");
  const dispatch = useDispatch();
  const { summary } = useSelector((state) => state.gardenReducer);
  const { plants } = useSelector((state) => state.plantsReducer);
  return (
    <Wrapper>
      {summary.map((each) => {
        const plant = getPlantObjById(each.id, JSON.parse(plants));
        return (
          <SummaryDiv>
            <p>
              {plant.name}
              <Icon
                icon={weatherSunny}
                size={20}
                onClick={() =>
                  dispatch(toggleModalShowing(plant.optimal_sun, "sunshine:"))
                }
              />
            </p>
            <Quantity>{"X " + each.quantity}</Quantity>
          </SummaryDiv>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
`;

const SummaryDiv = styled.div`
  width: 200px;
  display: flex;
  position: relative;
  margin: 10px 0;
  p {
    width: 100%;
    background-color: ${COLORS.title_green};
    color: whitesmoke;
  }
`;

const Quantity = styled.span`
  background-color: ${COLORS.tomato};
  color: whitesmoke;
  width: 30px;
  height: 30px;
  position: absolute;
  padding-top: 10px;
  margin-left: 150px;
  margin-top: -10px;
`;

export default Summary;
