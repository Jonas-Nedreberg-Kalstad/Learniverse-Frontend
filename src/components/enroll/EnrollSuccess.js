import '../../App.css';
import Rating from '../common/rating/Rating';
import Duration from './Duration';

function EnrollSuccess({ data }) {

  return (
    <div style={{display:'flex', flexDirection:'column',  alignItems:'center', gap:'32px'}}>
        <section className="Order-Overview-Main-Container">
        <h2>Successfully enrolled into course</h2>
            <div style={{display:'flex', flexDirection:'row', gap:'16px'}}>
                <img style={{height:'128px'}} src={data.courseImageUrl}/>
                <div style={{height:'128px', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                    <text className='Text-Light'>{data?.courseName ?? "Course title unavailable"}</text>
                    <Rating rating={data?.averageRating ?? 0} amount={data?.numberOfReviews ?? 0} light={true} />
                    <text className='Text-Light'>{data?.provider.providerName ?? "Creator not found"}</text>
                </div>
            </div>
        </section>
        <section style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'40vw', minWidth:'320px'}}>
            <p style={{fontSize:'x-large', textAlign:'center'}}>You can view your enrollment in your profile. Visit the provider's homepage for more details about the course, thank you for using Learniverse Connect!</p>
            <br/>
            <button onClick={() => window.location.href = data?.provider?.providerUrl}>Go to external page</button>
        </section>
    </div>
  );
}

export default EnrollSuccess;