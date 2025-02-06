import '../App.css';
import Breadcrumps from './Breadcrumbs';
import Rating from './Rating';

function CourseCard({title, creator, price, currency, rating, reviewAmount}) {
  return (
    <div className="Course-Main-Container">
      <div className="Course-Main-Top-Container">
        <Breadcrumps category={"Business"} courseName={"The Art of Looking Busy While Doing Nothing"} />
      </div>
      <div className="Course-Main-Card-Container">
        <div>
          <img style={{width:'576px', height:'384'}} src='https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp'></img>
        </div>
        <div className='Course-Showcase-Container'>
          <div>
            <b className='Text-Light-Title'>{title}</b>
            <p className='Text-Light'>Undertitle</p>
            <div><text className='Text-Light'>Course by </text><a className='Text-Light' href=''>{creator}</a></div>
            <Rating rating={rating} amount={reviewAmount} light={false} />
          </div>
          <div>
            <b className='Text-Light'>{price} {currency}</b>
            <button className='Button-Large'>Enroll</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;