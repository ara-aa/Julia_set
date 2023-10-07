import express from "express";
import * as math from "mathjs";
import { width, height, threshold } from "../common/const";

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
    console.log(data);

    const result = checkCalc(
      Number(data["min_x"]),
      Number(data["max_x"]),
      Number(data["min_y"]),
      Number(data["max_y"]),
      data["comp_const"],
    );

    if (typeof result === "string") {
      res.status(412).json({ errorMessage: result });
    } else {
      res.json({ img: result });
    }

    console.log(data);
  } catch (error) {
    console.error(error);
  }
});

// 発散するか確認
const checkCalc = (
  min_x: number,
  max_x: number,
  min_y: number,
  max_y: number,
  comp_const: string,
) => {
  console.log(comp_const.split(" "));
  const C = math.complex(comp_const);
  const yy: number = math.abs(C);
  console.log("C:", C, yy);
  if (math.abs(C) > 2) {
    return "複素定数が2より大きいため描画できません。";
  }
  const errorMessage = checkDiverge(min_x, max_x, min_y, max_y, comp_const);
  if (errorMessage) {
    return errorMessage;
  }

  const a: number[] = [...Array(width)].map((_, i) => 0);
  const img = [];
  for (let i = 0; i < height; i++) {
    img[i] = a;
  }

  return img;
};

const checkDiverge = (
  min_x: number,
  max_x: number,
  min_y: number,
  max_y: number,
  comp_const: string,
): string | void => {
  const C = math.complex(comp_const);

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const Z = math.complex(
        min_x + ((max_x - min_x) / width) * i,
        min_y + ((max_y - min_y) / height) * j,
        // min_x + ((max_x - min_x) * i) / width,
        // min_y + ((max_y - min_y) * j) / height,
      );
      // const Z = X[i] + j * Y[j];
      console.log("Z: ", Z);

      // 閾値を100として発散するかを確認
      for (let k = 0; k < threshold; k++) {
        const z = math.add(math.square(Z), C);
        console.log("z: ", z, math.abs(z));
        if (math.larger(math.abs(z), 2)) {
          // img[i][j] = k;
          return "無限大に発散するため描画できません。";
        }
      }
    }
  }
};
