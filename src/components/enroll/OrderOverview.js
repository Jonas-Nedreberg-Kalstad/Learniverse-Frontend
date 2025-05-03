import '../../App.css';
import { useEffect, useState } from 'react';
import Rating from '../common/rating/Rating';
import Duration from './Duration';

function OrderOverview({ course }) {

  const [image, setImage] = useState(require('../../public/assets/images/placeholder-image.png'));

  useEffect(() => {
    if(course) {
      setImage(course.courseImageUrl);
    }
  }, [course]);

  return (
    <section className="Order-Overview-Main-Container">
        <h2>Enroll into course</h2>
        <div style={{display:'flex', flexDirection:'row', gap:'16px', flexWrap:'wrap', justifyContent:'center'}}>
            <img style={{height:'128px'}} src={image}/>
            <div style={{height:'128px', maxWidth:'320px', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                <text className='Text-Light'>{course?.courseName ?? "Course title unavailable"}</text>
                <Rating rating={course?.averageRating ?? 0} amount={course?.numberOfReviews ?? 0} light={true} />
                <text className='Text-Light'>Created by: {course?.provider?.providerName ?? "Creator not found"}</text>
            </div>
        </div>
        <Duration courseStartDate={course?.startDate} courseEndDate={course?.endDate} />
    </section>
  );
}

export default OrderOverview;