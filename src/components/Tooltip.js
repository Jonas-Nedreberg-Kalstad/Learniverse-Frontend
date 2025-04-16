import React, { useRef, useState, useEffect } from 'react';
import '../App.css';

function Tooltip({ tooltip }) {
  const tooltipRef = useRef(null);
  const containerRef = useRef(null);
  const [alignRight, setAlignRight] = useState(true);

  useEffect(() => {
    const handlePosition = () => {
      if (tooltipRef.current && containerRef.current) {
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const spaceRight = window.innerWidth - containerRect.right;
        const spaceLeft = containerRect.left;

        // If not enough space on the right, align left
        if (spaceRight < tooltipRect.width && spaceLeft > tooltipRect.width) {
          setAlignRight(false);
        } else {
          setAlignRight(true);
        }
      }
    };

    handlePosition();
    window.addEventListener('resize', handlePosition);
    return () => window.removeEventListener('resize', handlePosition);
  }, [tooltip]);

  return (
    <div className='Tooltip-Container' ref={containerRef}>
      <img className='icon' src={require('../public/assets/images/tooltip-icon.png')} alt='View tooltip'/>
      <div
        ref={tooltipRef}
        style={{
          right: alignRight ? 'auto' : 0,
          left: alignRight ? 0 : 'auto',
        }}
      >
        <span>{tooltip}</span>
      </div>
    </div>
  );
}

export default Tooltip;