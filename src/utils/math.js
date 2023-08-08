import { MIN } from "./consts";
export const mathRandomWithMin = (max) => {
  return Math.floor(Math.random() * (max - MIN) + MIN);
};

export const mathRandom = (max) => {
  return Math.floor(Math.random() * max);
};
