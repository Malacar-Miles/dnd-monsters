import "./app.css";
import { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);

  const handlePlusClick = () => {
    setCounter((currentCount) => currentCount + 1);
  };

  const handleMinusClick = () => {
    setCounter((currentCount) => Math.max(currentCount - 1, 0));
  };

  return (
    <div className="placeholder-app">
      <h1>Placeholder App</h1>
      <div className="counter">
        <button onClick={handleMinusClick}>-</button>
        <span className="counter-value">{counter}</span>
        <button onClick={handlePlusClick}>+</button>
      </div>
    </div>
  );
}

export default App;
