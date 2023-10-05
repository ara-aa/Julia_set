import express from "express";
import * as math from "mathjs";

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

    const result = calCount(
      Number(data["min_x"]),
      Number(data["max_x"]),
      Number(data["min_y"]),
      Number(data["max_y"]),
      data["comp_const"],
    );

    if (typeof result === "string") {
      res.status(412).json({ error: result });
    }

    console.log(data);
  } catch (error) {
    console.error(error);
  }
});

const h = 255;
const w = 255;

// 発散するか確認
function calCount(
  min_x: number,
  max_x: number,
  min_y: number,
  max_y: number,
  comp_const: string,
) {
  const C = math.complex(comp_const);

  calcLoop: for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      const Z = math.complex(
        min_x + ((max_x - min_x) * i) / w,
        min_y + ((max_y - min_y) * j) / h,
      );
      console.log("Z: ", Z);

      for (let k = 0; k < 100; k++) {
        const z = math.add(math.square(Z), C); // zを2乗してCを足す
        console.log("z: ", z);
        // 発散するかを確認
        if (math.larger(math.abs(z), 2)) {
          break calcLoop;
        }
        return {};
      }
    }
  }
  return "描画できない入力でした。";
}
