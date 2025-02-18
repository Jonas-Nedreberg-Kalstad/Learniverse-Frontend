import '../App.css';
import { useEffect, useState } from 'react';

function Duration({ courseStartDate, courseEndDate }) {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [duration, setDuration] = useState(null);
    
    useEffect(() => {
        const start = new Date(courseStartDate);
        const end = new Date(courseEndDate);

        setStartDate(start);
        setEndDate(end);

        setDuration(Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)));
    }, [courseStartDate, courseEndDate])

  return (
    <div className='Duration-Container'>
        <text>{`${duration} days`}</text>
        <div style={{display:'flex', flexDirection:'row', gap:'32px', alignItems:'center'}}>
            <span style={{display:'flex', flexDirection:'column'}}>
                <text>Start date</text>
                <text>{startDate ? `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}` : "Error"}</text>
            </span>
            <img style={{height:'32px'}} src='https://cdn-icons-png.flaticon.com/512/664/664866.png'/>
            <span style={{display:'flex', flexDirection:'column'}}>
                <text>End date</text>
                <text>{endDate ? `${endDate.getDate()}.${endDate.getMonth() + 1}.${endDate.getFullYear()}` : "Error"}</text>
            </span>
            
        </div>
    </div>
  );
}

export default Duration;