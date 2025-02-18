import '../App.css';
import Rating from './Rating';
import Duration from './Duration';

function EnrollSuccess({ data }) {

  return (
    <div style={{display:'flex', flexDirection:'column',  alignItems:'center', gap:'32px'}}>
        <div className="Order-Overview-Main-Container">
        <h2>Successfully enrolled into course</h2>
            <div style={{display:'flex', flexDirection:'row', gap:'16px'}}>
                <img style={{height:'128px'}} src='https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp'/>
                <div style={{height:'128px', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                    <text className='Text-Light'>{data?.courseName ?? "Course title unavailable"}</text>
                    <Rating rating={data?.averageRating ?? 0} amount={data?.numberOfReviews ?? 0} light={true} />
                    <text className='Text-Light'>{data?.creator ?? "Creator not found"}</text>
                </div>
            </div>
        </div>
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'375px'}}>
            <p style={{fontSize:'x-large', textAlign:'center'}}>You can view your enrollment in your profile. Visit the provider's homepage for more details about the course, thank you for using Learniverse Connect!</p>
            <button onClick={() => window.location.href = 'https://example.com'}>Go to external page</button>
        </div>
    </div>
  );
}

export default EnrollSuccess;