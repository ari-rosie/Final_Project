import { useSelector } from "react-redux";

export const UseGetPlantObjById = (id) => {
  const { plants } = useSelector((state) => state.plantsReducer);
  return JSON.parse(plants).find((plant) => plant.id === id);
};
