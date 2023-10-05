import { useState, useEffect } from "react";

const Julia: React.FC = () => {
  // contextを状態として持つ
  // const [context, setContext] = useState(null);
  // // 画像読み込み完了トリガー
  // const [loaded, setLoaded] = useState(false);
  // // コンポーネントの初期化完了後コンポーネント状態にコンテキストを登録
  // useEffect(() => {
  //   const canvas = document.getElementById("canvas");
  //   if (canvas === null) {
  //   }
  //   const canvasContext = canvas.getContext("2d");
  //   setContext(canvasContext);
  // }, []);
  // // 状態にコンテキストが登録されたらそれに対して操作できる
  // useEffect(() => {
  //   if (context !== null) {
  //     const img = new Image();
  //     img.src = "img.jpg"; // 描画する画像など
  //     img.onload = () => {
  //       context.drawImage(img, 0, 0);
  //       // 更にこれに続いて何か処理をしたい場合
  //       setLoaded(true);
  //     };
  //   }
  // }, [context]);
  // useEffect(() => {
  //   if (loaded) {
  //     // それに続く処理
  //   }
  // }, [loaded]);

  return <canvas id="canvas" className="julia"></canvas>;
};

export default Julia;
