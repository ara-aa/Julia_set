import * as math from "mathjs";
import { width, height, threshold } from "../../common/const";
import { getRows } from "./getRows";
import { cMaps } from "../style/color";
export const checkDiverge = (
  min_x: number,
  max_x: number,
  min_y: number,
  max_y: number,
  comp_const: string,
): string | string[][] => {
  const [comp_a, comp_b] = comp_const.replace("i", "").split(" ").map(Number);

  if (!comp_a || !comp_b) {
    return "複素定数のエラーです。";
  }

  if (math.larger(math.abs(comp_a + -comp_b), 2)) {
    return "複素定数が2より大きいため描画できません。";
  }

  const rows = getRows();

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let x = min_x + (i * (max_x - min_x)) / width;
      let y = min_y + (j * (max_y - min_y)) / height;

      for (let k = 1; k <= threshold; k++) {
        let xx = Math.pow(x, 2) - Math.pow(y, 2) + comp_a;
        let yy = 2 * x * y + comp_b;

        if (Math.pow(xx, 2) + Math.pow(yy, 2) > 4.0) {
          rows[i][j] = cMaps[k];
          break;
        }

        x = xx;
        y = yy;
      }
    }
  }
  return rows;
};
