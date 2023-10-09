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
  const C = math.complex(comp_const);

  if (math.larger(math.abs(C), 2)) {
    return "複素定数が2より大きいため描画できません。";
  }

  const rows = getRows();
  const n = Math.log10(threshold);

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const Z = math.complex(
        min_x + ((max_x - min_x) * i) / width,
        min_y + ((max_y - min_y) * j) / height,
      );

      for (let k = 1; k <= threshold; k++) {
        const z = math.add(math.square(Z), C);
        if (math.larger(math.abs(z), 2)) {
          const v: number = Math.floor(
            (255 * Math.log10(k)) / n,
          ) as unknown as number;

          rows[i][j] = cMaps[v];
          // rows[i][j] = k;
          // console.debug("rows:", v, rows[i][j], k);
          break;
        }
      }
    }
  }
  return rows;
};
