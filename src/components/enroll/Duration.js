import '../../App.css';
import { useEffect, useState } from 'react';

function Duration({ courseStartDate, courseEndDate }) {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    
    useEffect(() => {
        const start = new Date(courseStartDate);
        const end = new Date(courseEndDate);

        setStartDate(start);
        setEndDate(end);

    }, [courseStartDate, courseEndDate])

  return (
    <div className='Duration-Container'>
        <div style={{display:'flex', flexDirection:'row', gap:'16px', alignItems:'center'}}>
            <span style={{display:'flex', flexDirection:'column'}}>
                <text>Start date</text>
                <text>{startDate ? `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}` : "Error"}</text>
            </span>
            <img style={{height:'32px', width:'32px'}} src={require('../../public/assets/images/right-arrow-icon.png')}/>
            <span style={{display:'flex', flexDirection:'column'}}>
                <text>End date</text>
                <text>{endDate ? `${endDate.getDate()}.${endDate.getMonth() + 1}.${endDate.getFullYear()}` : "Error"}</text>
            </span>
            
        </div>
    </div>
  );
}

export default Duration;