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
            
            <div style={{display:'flex', flexDirection:'column'}}>
                <label>Start date</label>
                <time>{startDate ? `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}` : "Error"}</time>
            </div>

            <img style={{height:'32px', width:'32px'}} src={require('../../public/assets/images/right-arrow-icon.png')}/>

            <div style={{display:'flex', flexDirection:'column'}}>
                <label>End date</label>
                <time>{endDate ? `${endDate.getDate()}.${endDate.getMonth() + 1}.${endDate.getFullYear()}` : "Error"}</time>
            </div>
            
        </div>
    </div>
  );
}

export default Duration;