import { useState } from "react";
import "./App.css";
import Child from "./components/Child";

const App = () => {
  const [counter, setCounter] = useState(0);
  const handleChange = (newValue) => {
    setCounter(newValue);
  };

  return (
    <div className="App">
      <h1>{counter}</h1>
      <Child counter={counter} onCounterChange={handleChange} />
      {counter < 0 && <p>Why so negative?</p>}
    </div>
  );
};

export default App;
