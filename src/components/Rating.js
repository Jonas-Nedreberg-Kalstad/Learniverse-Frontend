import React from 'react';
import { useMemo } from 'react';
import '../App.css';
import fullStarIcon from '../public/assets/images/full-star-icon.png';
import halfStarIcon from '../public/assets/images/half-star-icon.png';
import emptyStarIcon from '../public/assets/images/empty-star-icon.png';

function Rating({ rating, amount, light }) {
  
  const icons = useMemo(() => {
    let ratingInteger = Math.floor(rating);
    if (ratingInteger > 5) ratingInteger = 5;

    const stars = [];

    // Generate full stars
    for (let i = 0; i < ratingInteger; i++) {
      stars.push(<img key={`full-${i}`} className='star-icon' src={fullStarIcon} alt="Full Star" />);
    }

    // Generate half star if needed
    if (stars.length < 5 && rating % 1 >= 0.5) {
      stars.push(<img key="half" className='star-icon' src={halfStarIcon} alt="Half Star" />);
    }

    // Generate empty stars
    while (stars.length < 5) {
      stars.push(<img key={`empty-${stars.length}`} className='star-icon' src={emptyStarIcon} alt="Empty Star" />);
    }

    return stars;
  }, [rating]); // 🔥 Only re-run when `rating` changes

  return (
    <div className="rating-container">
      {icons}
      {light ? <span className='Text-Light'>{amount > 0 ? `(${amount})` : ''}</span> : <span>{amount > 0 ? `(${amount})` : ''}</span>}
    </div>
  );
}

export default Rating;