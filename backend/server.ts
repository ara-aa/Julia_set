import express from "express";

const app: express.Express = express();
const port = 8888;

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello, world!");
});

app.get("/api", (req: express.Request, res: express.Response) => {
  res.json([
    {
      id: 1,
      image: "https://source.unsplash.com/gDPaDDy6_WE",
      name: "りんご",
      price: 200,
    },
    {
      id: 2,
      image: "https://source.unsplash.com/zrF6ACPLhPM",
      name: "バナナ",
      price: 300,
    },
    {
      id: 3,
      image: "https://source.unsplash.com/bogrLtEaJ2Q",
      name: "みかん",
      price: "150",
    },
    {
      id: 4,
      image: "https://source.unsplash.com/8keUtGmy0xo",
      name: "メロン",
      price: "2000",
    },
  ]);
});

app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`);
});
