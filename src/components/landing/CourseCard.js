import '../../App.css';
import { useNavigate } from "react-router-dom";
import Rating from '../common/rating/Rating';

function CourseCard({id, imgLink, title, creator, rating, amount}) {

  const navigate = useNavigate();

  return (
    <div className="Course-Card-Container" style={{ cursor:'pointer' }} onClick={() => navigate(`course/${id}`)}>
      <img style={{height:'128px', maxWidth:'100%', borderRadius:'5px 5px 0px 0px'}} src={imgLink} alt='CourseImage'/>
      <div className='Course-Card-Info'>
        <text>{title}</text>
        <Rating rating={rating} amount={amount} light={false} />
        <text>{creator}</text>
      </div>
    </div>
  );
}

export default CourseCard;