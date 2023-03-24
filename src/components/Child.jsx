import { useState } from "react";

const Child = ({ counter, onCounterChange }) => {
  const handleMinusClick = () => {
    /* Implement logic here */
    onCounterChange(counter - 1);
  };

  const handlePlusClick = () => {
    /* Implement logic here */
    onCounterChange(counter + 1);
  };

  return (
    <div>
      <button type="button" className="btn" onClick={handleMinusClick}>
        -
      </button>

      <button type="button" className="btn" onClick={handlePlusClick}>
        +
      </button>
    </div>
  );
};

export default Child;
