import '../../App.css';
import Rating from '../Rating';
import Duration from './Duration';

function OrderOverview({ data }) {

  return (
    <div className="Order-Overview-Main-Container">
        <h2>Enroll into course</h2>
        <div style={{display:'flex', flexDirection:'row', gap:'16px'}}>
            <img style={{height:'128px'}} src='https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp'/>
            <div style={{height:'128px', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                <text className='Text-Light'>{data?.courseName ?? "Course title unavailable"}</text>
                <Rating rating={data?.averageRating ?? 0} amount={data?.numberOfReviews ?? 0} light={true} />
                <text className='Text-Light'>{data?.creator ?? "Creator not found"}</text>
            </div>
        </div>
        <Duration courseStartDate={data?.startDate} courseEndDate={data?.endDate} />
    </div>
  );
}

export default OrderOverview;