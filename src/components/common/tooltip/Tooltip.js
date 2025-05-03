import React, { useRef, useState, useEffect } from 'react';
import '../../../App.css';
import './Tooltip.css';

function Tooltip({ tooltip }) {

  return (
    <div className='Tooltip-Container'>
      <img className='icon' src={require('../../../public/assets/images/tooltip-icon.png')} alt='View tooltip'/>
      <div>
        <span>{tooltip}</span>
      </div>
    </div>
  );
}

export default Tooltip;