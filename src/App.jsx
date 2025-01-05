import { useState } from "react";
import ccLogo from "./assets/icons8-carbon-96.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={ccLogo} className="logo" alt="CarbonCounter logo" />
        </a>
      </div>
      <h1>CarbonCounter</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 6)}>
          Carbon count is {count}
        </button>
      </div>
      <p className="logo-disclaimer">
        <a target="_blank" href="https://icons8.com/icon/XvyreRX8zlV7/carbon">
          Carbon
        </a>{" "}
        icon by{" "}
        <a target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </p>
    </>
  );
}

export default App;
