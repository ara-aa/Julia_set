import { FC, useEffect } from "react";

type Props = {
  visible: boolean;
  msg: string;
  hideToast: () => void;
};

export const Toast: FC<Props> = ({ visible, hideToast, msg }) => {
  useEffect(() => {
    if (visible) {
      window.setTimeout(() => {
        hideToast();
      }, 5000);
    }
  }, [visible]);

  return (
    <h1 className="toast" style={{ display: visible ? "block" : "none" }}>
      <p className="text">{msg}</p>
    </h1>
  );
};
