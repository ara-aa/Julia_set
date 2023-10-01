export type InputParamType = {
  min_x: number | string;
  max_x: number | string;
  min_y: number | string;
  max_y: number | string;
  comp_const: number | string;
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

// const labels: LABEL = {
//   [INPUT_NAME.min_x]: "実数部最小値 min_x",
//   [INPUT_NAME.max_x]: "実数部最大値 max_x",
//   [INPUT_NAME.min_y]: "虚数部最小値 min_y",
//   [INPUT_NAME.max_y]: "虚数部最大値 max_y",
//   [INPUT_NAME.comp_const]: "複素定数 comp_const",
// };
