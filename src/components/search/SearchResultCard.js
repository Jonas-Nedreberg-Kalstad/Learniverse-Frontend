import '../../App.css';
import { useNavigate } from "react-router-dom";
import Rating from '../common/rating/Rating';
import { useEffect, useState } from 'react';

function SearchResultCard({ course }) {

  const navigate = useNavigate();

  const [image, setImage] = useState(require('../../public/assets/images/placeholder-image.png'));

  useEffect(() => {
    if(course) {
      setImage(course.courseImageUrl);
    }
  }, [course])

  return (
    <div className="Search-Result-Card-Container" style={{ cursor:'pointer' }} onClick={() => navigate(`/course/${course?.id}`)}>
      <img src={image} alt='CourseImage'/>
      
      <div className='Course-Card-Info'>
        <text>{course?.courseName}</text>
        <Rating rating={course?.averageRating} amount={course?.numberOfReviews} light={false} />
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
          <text>{course?.provider?.providerName}</text>
          <b>{course?.price} {course?.currency?.currency}</b>
        </div>
      </div>
    </div>
  );
}

export default SearchResultCard;