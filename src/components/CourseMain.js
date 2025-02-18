import { useNavigate } from 'react-router-dom';
import '../App.css';
import Breadcrumps from './Breadcrumbs';
import Rating from './Rating';

function CourseCard({id, title, creator, price, currency, rating, reviewAmount}) {

  const navigate = useNavigate();

  return (
    <main className="Course-Main-Container">
      <section className="Course-Main-Top-Container">
        <Breadcrumps category={"Business"} courseName={"The Art of Looking Busy While Doing Nothing"} />
      </section>
      
      <article className="Course-Main-Card-Container">
        <figure>
          <img style={{ width: '576px', height: '336px' }} src='https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp' alt="Course Image" />
        </figure>
  
        <section className="Course-Showcase-Container">
          <header>
            <h1 className='Text-Light-Title'>{title}</h1>
            <p className='Text-Light'>Undertitle</p>
            <p>
              <span className='Text-Light'>Course by </span>
              <a className='Text-Light' href=''>{creator}</a>
            </p>
            <Rating rating={rating} amount={reviewAmount} light={false} />
          </header>
  
          <footer>
            <b className='Text-Light'>{price} {currency}</b>
            <button className='Enroll-Button' onClick={() => { navigate(`enroll`) }}>Enroll</button>
          </footer>
        </section>
      </article>
    </main>
  );
}

export default CourseCard;