import express from "express";
import type { InputParamType, ErrorMessageType } from "../types/type";

const app: express.Express = express();
const port = 8888;

app.listen(port);

// app.get("/", (req: express.Request, res: express.Response) => {
//   res.send("Hello, world!");
// });

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.post("/julia", (req, res, next) => {
  try {
    const json: keyof InputParamType = req.body;

    const errors: ErrorMessageType = {
      min_x: "",
      max_x: "",
      min_y: "",
      max_y: "",
      comp_const: "",
    };
    for (const [key, value] of Object.entries(json)) {
      const msg = inputValidation(value);
      if (msg.length !== 0) {
        // errors[key] = msg;
      }
    }

    console.log(res);
  } catch (error) {
    console.error(error);
  }
});

const inputValidation = (val: string) => {
  if (!val) {
    return "必須入力です。";
  }

  const r = /^[+,-]?([1-9]\d*|0)(\.\d+)?$/;
  if (r.test(val)) {
    return "";
  } else {
    return "数値を入力してください。";
  }
};
