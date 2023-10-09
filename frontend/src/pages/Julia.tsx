import { useState, useEffect, useContext } from "react";
import { width, height } from "../../../common/const";
import { ToastContext } from "../components/ToastProvider";
import { Loading } from "../components/Loading";

const Julia = (props: { juliaRows: number[][]; count: number }) => {
  const [png, setPng] = useState<string | null>(null);
  const showToast = useContext(ToastContext);
  const juliaRows = props.juliaRows;
  const count = props.count;

  const openToast = (msg: string) => {
    showToast && showToast(msg);
  };

  useEffect(() => {
    const canvasElem = document.createElement("canvas");
    canvasElem.width = width;
    canvasElem.height = height;
    const ctx = canvasElem.getContext("2d");

    if (!ctx) {
      openToast("canvas要素を取得できませんでした。");
    } else {
      juliaRows.forEach((h, i) => {
        h.forEach((w, j) => {
          ctx.fillStyle = `${w}`;
          ctx.fillRect(i, j, 1, 1);
        });
      });

      setPng(canvasElem.toDataURL());
    }
  }, [count]);

  return (
    <>
      {!png && <Loading />}
      <div className="julia">{png && <img alt="julia_set" src={png} />}</div>
    </>
  );
};

export default Julia;
