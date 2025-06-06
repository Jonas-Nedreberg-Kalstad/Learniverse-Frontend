import '../../App.css';
import { useEffect, useState } from 'react';

function FilterDrowdown({name, options, selectedOption, onSelectedOption}) {

  const [isOpened, setIsOpened] = useState(false);
  const [selectedValue, setSelectedValue] = useState(selectedOption ? selectedOption : null);

  const handleChangeOption = (option) => {
    if (selectedValue !== option) {
        setSelectedValue(option);
        onSelectedOption(option);
    } else {
        setSelectedValue(null);
        onSelectedOption(null);
    }
  };

  useEffect(() => {
    setSelectedValue(selectedOption);
  }, [selectedOption]);

  return (
    <section className="Dropdown-Container">
        <h3 style={{cursor:'pointer'}} onClick={() => setIsOpened(!isOpened)}>{name}</h3>
        {isOpened &&
          (
            <div className='Dropdown-Content-Container'>
              {options.map((option) => (
                <div key={option} style={{ display: 'flex', flexDirection: 'row', cursor:'pointer', alignItems:'center' }} onClick={() => {handleChangeOption(option)}}>
                  <input style={{ cursor:'pointer' }} className="checkbox" type='checkbox' checked={selectedValue === option} />
                  <p>{option}</p>
                </div>
              ))}
            </div>
          )
        }
    </section>
  );
}

export default FilterDrowdown;