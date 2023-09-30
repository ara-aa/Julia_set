import * as React from "react";
import Form from "./components/Form";
import Julia from "./pages/Julia";

const App: React.FC = () => {
  return (
    <div className="container appList">
      <Form />
      <Julia />
    </div>
  );
};

export default App;
