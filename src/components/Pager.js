import React, { useEffect, useState } from 'react';

function Pager({ initializeValue, resultCount, onValueChange }) {
  const [value, setValue] = useState(() => {
    const intValue = parseInt(initializeValue, 10);
    return isNaN(intValue) ? 1 : intValue;
  });

  const [maxPage, setMaxPage] = useState(resultCount ? Math.ceil(resultCount/5) : 0);

  useEffect(() => {
    setMaxPage(resultCount ? Math.ceil(resultCount/5) : 0);
  }, [resultCount]);

  const increment = () => {
    setValue(prevValue => {
      const newValue = prevValue + 1;
      onValueChange(newValue);  // Share updated value with parent
      return newValue;
    });
  };
  
  const decrement = () => {
    setValue(prevValue => {
      const newValue = prevValue > 1 ? prevValue - 1 : 1;  // Ensure value doesn't go below 1
      onValueChange(newValue);  // Share updated value with parent
      return newValue;
    });
  };

  console.log(maxPage);
  

  return (
    <div className="Pager-Container">
      <button disabled={value == 1} onClick={decrement}>˂</button>
      <span>{value}</span>
      <button disabled={value >= maxPage} onClick={increment}>˃</button>
    </div>
  );
}

export default Pager;