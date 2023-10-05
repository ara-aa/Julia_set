import * as React from "react";
import Form from "./pages/Form";
import Julia from "./pages/Julia";
import { ToastProvider } from "./components/ToastProvider";

const App: React.FC = () => {
  return (
    <div className="container appList" id="__next">
      <ToastProvider>
        <Form />
        <Julia />
      </ToastProvider>
    </div>
  );
};

export default App;
