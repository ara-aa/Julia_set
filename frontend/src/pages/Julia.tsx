import {
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
  useRef,
} from "react";
import { width, height, threshold } from "../../../common/const";
import { ToastContext } from "../components/ToastProvider";
import * as math from "mathjs";
// import { AssociativeArray } from "../../types/type";
import { InputParamType } from "../../types/type";

const Julia = (props: PropsWithChildren<InputParamType>) => {
  const [png, setPng] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;
    return canvas.getContext("2d");
  };

  const showToast = useContext(ToastContext);
  const min_x = Number(props.min_x);
  const max_x = Number(props.max_x);
  const min_y = Number(props.min_y);
  const max_y = Number(props.max_y);
  const comp_const = props.comp_const;

  console.log("--- render j ");

  useEffect(() => {
    console.log("--- useEffect");
    // const canvasElem = document.createElement("canvas");
    // canvasElem.width = width;
    // canvasElem.height = height;
    // const ctx = canvasElem.getContext("2d");
    const ctx: CanvasRenderingContext2D = getContext();

    console.log("--- ctx");
    // draw
    if (ctx === null) {
      openToast("canvas要素を取得できませんでした。");
    } else {
      const a: number[] = [...Array(width)].map((_, i) => 0);
      const img = [];
      for (let i = 0; i < height; i++) {
        // img[i] = [];
        // for (let j = 0; j < width; j++) {
        //   if (img[i]![j] !== undefined) img[i]![j] = 0;
        // }
        img[i] = a;
      }
      ctx.clearRect(0, 0, width, height);

      const C = math.complex(comp_const);

      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          const Z = math.complex(
            min_x + ((max_x - min_x) * i) / width,
            min_y + ((max_y - min_y) * j) / height,
          );

          // 閾値を100として発散するかを確認
          for (let k = 0; k < threshold; k++) {
            const z = math.add(math.square(Z), C);
            if (math.larger(math.abs(z), 2)) {
              img[i][j] = k;
              break;
            }
          }
        }
      }

      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          console.log(
            math.floor((255 * Math.log10(img[i][j])) / math.log10(threshold)),
          );

          ctx.fillStyle =
            "rgb(" +
            math.floor((255 * Math.log10(img[i][j])) / math.log10(threshold)) +
            ",0,0)";
          ctx.fillRect(i, j, 1, 1);
        }
      }

      ctx.save();
      // setPng(() => canvasElem.toDataURL());
      console.log("po");
    }
  }, [min_x, max_x, min_y, max_y, comp_const]);

  const openToast = (msg: string) => {
    showToast && showToast(msg);
  };

  return (
    <>
      {/* {png && ( */}

      <canvas
        id="canvas"
        ref={canvasRef}
        width={width}
        height={height}
        className="julia"
      ></canvas>
    </>
  );
};

export default Julia;
