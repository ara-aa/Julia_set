import { type Complex } from "mathjs";
export type InputParamType = {
  min_x: number | string;
  max_x: number | string;
  min_y: number | string;
  max_y: number | string;
  comp_const: number | string | Complex;
};

export type ErrorMessageType = {
  min_x: string;
  max_x: string;
  min_y: string;
  max_y: string;
  comp_const: string;
};

export type ParamType = {
  values: InputParamType;
  messages: ErrorMessageType;
};

export type InputKeyName = "min_x" | "max_x" | "min_y" | "max_y" | "comp_const";

// const labels: LABEL = {
//   [INPUT_NAME.min_x]: "実数部最小値 min_x",
//   [INPUT_NAME.max_x]: "実数部最大値 max_x",
//   [INPUT_NAME.min_y]: "虚数部最小値 min_y",
//   [INPUT_NAME.max_y]: "虚数部最大値 max_y",
//   [INPUT_NAME.comp_const]: "複素定数 comp_const",
// };

export type AssociativeArray = [number[]];
