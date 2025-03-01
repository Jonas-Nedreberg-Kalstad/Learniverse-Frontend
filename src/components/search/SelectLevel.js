import '../../App.css';
import { useState } from 'react';

function SelectLevel({name}) {

    const [isOpened, setIsOpened] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");

    const options = [
      'Information Technologies',
      'Digital Marketing',
      'Business and Entrepreneurship',
      'Data Science and Analytics'
    ];

    const handleChangeOption = (option) => {
      setSelectedValue(option);
    }

  return (
    <div className="Dropdown-Container">
        <h3 onClick={() => setIsOpened(!isOpened)}>{name}</h3>
        {isOpened &&(<div className='Dropdown-Content-Container'>
            {options.map((option) => (
              <div key={option} style={{ display: 'flex', flexDirection: 'row' }}>
                <input type='checkbox' checked={selectedValue === option} onChange={() => {handleChangeOption(option)}} />
                <text>{option}</text>
              </div>
            ))}
            </div>)
        }
    </div>
  );
}

export default SelectLevel;