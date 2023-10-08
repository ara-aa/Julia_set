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
      // res.json({ img: result });
      res.json({ img: "ok" });
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
  const errorMessage = checkDiverge(min_x, max_x, min_y, max_y, comp_const);
  if (errorMessage) {
    return errorMessage;
  }

  // const a: number[] = [...Array(width)].map((_, i) => 0);
  // const img = [];
  // for (let i = 0; i < height; i++) {
  //   img[i] = a;
  // }

  // return img;
  return;
};

const checkDiverge = (
  min_x: number,
  max_x: number,
  min_y: number,
  max_y: number,
  // C: math.Complex,
  // comp_r: number,
  // comp_i: number,
  comp_const: string,
): string | void => {
  // const [comp_r, comp_i] = comp_const.replace("i", "").split(" ").map(Number);
  // if (comp_r === undefined || comp_i === undefined) {
  //   return "";
  // }
  // const C = math.complex(comp_r, comp_i);
  const C = math.complex(comp_const);
  console.log(C);
  if (math.larger(math.abs(C), 2)) {
    return "複素定数が2より大きいため描画できません。";
  }

  console.log(C);
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      // const X = min_x + ((max_x - min_x) / width) * i;
      // const Y = min_y + ((max_y - min_y) / height) * j;
      const Z = math.complex(
        min_x + ((max_x - min_x) * i) / width,
        min_y + ((max_y - min_y) * j) / height,
      );

      // 閾値を100として発散するかを確認
      for (let k = 0; k < threshold; k++) {
        // const x = X * X - Y * Y + comp_r;
        // const y = 2.0 * X * Y + comp_i;
        // console.log(x, y, math.abs(x * x + y * y));
        const z = math.add(math.square(Z), C);
        console.log("z:", math.square(Z), z, math.abs(z));
        if (math.larger(math.abs(z), 2)) {
          // img[i][j] = k;
          // return "無限大に発散するため描画できません。";
        }
      }
    }
  }
};
