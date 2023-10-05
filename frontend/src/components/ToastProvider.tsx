import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";

type Props = {
  children: ReactNode;
};
type ContextType = (msg: string) => void;
export const ToastContext = createContext<ContextType | undefined>(undefined);

export const ToastProvider: FC<Props> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setVisible(true);
    setToastMessage(msg);
  };

  const hideToast = useCallback(() => setVisible(false), []);

  useEffect(() => {
    setShowPortal(true);
  }, []);

  if (!showPortal) {
    return null;
  }

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {createPortal(
        <Toast visible={visible} hideToast={hideToast} msg={toastMessage} />,
        document.getElementById("__next")!,
      )}
    </ToastContext.Provider>
  );
};
