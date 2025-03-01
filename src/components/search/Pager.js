import React, { useEffect, useState } from 'react';

function Pager({ initializeValue, resultCount, onValueChange }) {
  const [value, setValue] = useState(() => {
    const intValue = parseInt(initializeValue, 10);
    return isNaN(intValue) ? 1 : intValue;
  });

  const [maxPage, setMaxPage] = useState(resultCount ? Math.ceil(resultCount/5) : 1);

  useEffect(() => {
    setMaxPage(resultCount ? Math.ceil(resultCount/5) : 1);
  }, [resultCount]);

  const increment = () => {
    setValue(prevValue => {
      let newValue = prevValue + 1;
      newValue = newValue < 1 ? 1 : newValue; // Resets the pager if it happens to be out of the bound
      onValueChange(newValue);  // Share updated value with parent
      return newValue;
    });
  };
  
  const decrement = () => {
    setValue(prevValue => {
      let newValue = prevValue > 1 ? prevValue - 1 : 1;  // Ensure value doesn't go below 1
      newValue = newValue > maxPage ? maxPage : newValue; // Resets the pager if it happens to be out of the bound
      onValueChange(newValue);  // Share updated value with parent
      return newValue;
    });
  };
  


  return (
    <div className="Pager-Container">
      <button disabled={value <= 1} onClick={decrement}>˂</button>
      <span>{value}</span>
      <button disabled={value >= maxPage} onClick={increment}>˃</button>
    </div>
  );
}

export default Pager;