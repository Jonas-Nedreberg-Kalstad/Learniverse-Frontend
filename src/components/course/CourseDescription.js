import { useNavigate } from 'react-router-dom';
import '../../App.css';

function CourseDescription({ course }) {

  const navigate = useNavigate();

  const createTopicButtons = () => {
    return(
      course?.topics.map((topic, index) => (
        <button onClick={() => {navigate(`/search?topics=${topic.topic}:${topic.id}`)}}>{topic.topic}</button>
      ))
    )
  };

  return (
    <section className="Course-Information-Container">
      <header className="Course-Meta-Container">
        <h4>Category:</h4>
        <span><button onClick={() => { navigate(`/search?category=${course?.category?.category}`) }}>
          {course?.category?.category}
        </button></span>
  
        <h4>Topics:</h4>
        <div className='Topics-Button-Container'>
          {createTopicButtons()}
        </div>
      </header>
  
      <section className='Course-Description-Container'>
        <h2>Description</h2>
        <p>{course?.description}</p>
      </section>
    </section>
  );
  
}

export default CourseDescription;