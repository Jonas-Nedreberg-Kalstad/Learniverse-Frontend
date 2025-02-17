import React from 'react';
import '../App.css';
import Slider from 'react-slider';
import { useState } from 'react';

function PriceSlider({ price, onChangePrice }) {

  const [maxValue, setMaxValue] = useState(50000);
  const [value, setValue] = useState(price ? price : maxValue);

  return (
    <div>
        <h3>Price</h3>
        <br/>
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <text>0 NOK</text>
            <text>{value >= maxValue ? '∞' : `${value} NOK`}</text>
        </div>
        <Slider
            className="custom-slider"
            thumbClassName="custom-thumb"
            trackClassName="custom-track"
            min={0}
            max={maxValue}
            value={value}
            onChange={(newValue) => {setValue(newValue)}}
            onAfterChange={(newValue) => onChangePrice(newValue >= maxValue ? null : newValue)}
        />
    </div>
  );
}

export default PriceSlider;