import '../App.css';
import { useNavigate } from "react-router-dom";
import Rating from './Rating';

function SearchResultCard({id, imgLink, title, creator, rating, amount, price, currency}) {

  const navigate = useNavigate();

  return (
    <div className="Search-Result-Card-Container" style={{ cursor:'pointer' }} onClick={() => navigate(`/course/${id}`)}>
      <div style={{display:'flex', flexDirection:'row'}}>
        <img style={{height:'128px', maxWidth:'100%', borderRadius:'5px 0px 0px 5px'}} src={imgLink} alt='CourseImage'/>
        <div className='Course-Card-Info'>
          <text>{title}</text>
          <Rating rating={rating} amount={amount} light={false} />
          <text>{creator}</text>
        </div>
      </div>
      <div style={{display:'flex', alignItems:'end', padding:'8px'}}>
        <b>{price} {currency}</b>
      </div>
    </div>
  );
}

export default SearchResultCard;