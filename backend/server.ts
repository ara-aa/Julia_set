import express from "express";
import * as math from "mathjs";
import { width, height, threshold } from "../common/const";
import { cMaps } from "./color";

const app: express.Express = express();
const port = 8888;

app.listen(port);
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.post("/julia", (req, res) => {
  try {
    const data = req.body;

    const result = checkDiverge(
      Number(data["min_x"]),
      Number(data["max_x"]),
      Number(data["min_y"]),
      Number(data["max_y"]),
      data["comp_const"],
    );

    if (typeof result === "string") {
      res.status(412).json({ errorMessage: result });
    } else {
      res.json({ rows: result });
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: "エラーが発生しました。やり直してください。",
    });
  }
});

const checkDiverge = (
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
          break;
        }
      }
    }
  }
  return rows;
};

const getRows = (): string[][] => {
  const rows: string[][] = [];
  for (let i = 0; i < width; i++) {
    rows[i] = [];
    for (let j = 0; j < height; j++) {
      rows[i][j] = "#000";
    }
  }
  return rows;
};
