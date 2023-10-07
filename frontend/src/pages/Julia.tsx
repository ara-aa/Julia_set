import { useState, useEffect, useContext, PropsWithChildren } from "react";
import { width, height, threshold } from "../../../common/const";
import { ToastContext } from "../components/ToastProvider";
import * as math from "mathjs";
// import { AssociativeArray } from "../../types/type";

const Julia = (props: PropsWithChildren<{ juliaImage: [number[]] }>) => {
  const [png, setPng] = useState<string | null>(null);
  const showToast = useContext(ToastContext);
  const juliaImage = props.juliaImage;

  useEffect(() => {
    console.log("!!!!!!!!!!!!!!!!", juliaImage);
    const canvasElem = document.createElement("canvas");
    canvasElem.width = width;
    canvasElem.height = height;
    const ctx = canvasElem.getContext("2d");

    // draw
    if (ctx === null) {
      openToast("canvas要素を取得できませんでした。");
    } else if (!juliaImage?.length) {
      openToast("エラーです。");
    } else {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          ctx.fillStyle =
            "rgb(" +
            math.floor(
              (255 * Math.log10(juliaImage[i]?.[j] ?? 0)) /
                math.log10(threshold),
            ) +
            ",0,0)";
          ctx.fillRect(i, j, 1, 1);
        }
      }

      setPng(canvasElem.toDataURL());
    }
  }, []);

  const openToast = (msg: string) => {
    showToast && showToast(msg);
  };

  return (
    <>
      {png && (
        <canvas
          id="canvas"
          width={width}
          height={height}
          className="julia"
        ></canvas>
      )}
    </>
  );
};

export default Julia;
