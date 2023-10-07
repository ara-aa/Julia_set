import * as React from "react";
import Form from "./pages/Form";
import { ToastProvider } from "./components/ToastProvider";

const App: React.FC = () => {
  return (
    <div className="container appList" id="__next">
      <ToastProvider>
        <Form />
      </ToastProvider>
    </div>
  );
};

export default App;
