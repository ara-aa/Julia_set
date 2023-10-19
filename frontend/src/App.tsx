import * as React from "react";
import JuliaSet from "./pages/JuliaSet";
import { ToastProvider } from "./components/ToastProvider";

const App: React.FC = () => {
  return (
    <div className="container appList" id="__next">
      <ToastProvider>
        <JuliaSet />
      </ToastProvider>
    </div>
  );
};

export default App;
