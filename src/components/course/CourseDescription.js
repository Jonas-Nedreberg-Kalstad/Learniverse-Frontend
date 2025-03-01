import { useNavigate } from 'react-router-dom';
import '../../App.css';

function CourseDescription({description, category, topics}) {

  const navigate = useNavigate();

  const createTopicButtons = () => {
    return(
      topics.map((topic, index) => (
        <button onClick={() => {navigate(`/search?topics=${topic.topic}:${topic.id}`)}}>{topic.topic}</button>
      ))
    )
  };

  return (
    <section className="Course-Description-Container">
      <header className="Course-Meta-Container">
        <p><strong>Category:</strong></p>
        <span><button onClick={() => { navigate(`/search?category=${category.category}`) }}>
          {category.category}
        </button></span>
  
        <p><strong>Topics:</strong></p>
        <div>
          {createTopicButtons()}
        </div>
      </header>
  
      <section>
        <h2>Description</h2>
        <p>{description}</p>
      </section>
    </section>
  );
  
}

export default CourseDescription;