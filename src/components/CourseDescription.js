import '../App.css';

function CourseDescription({description, category, topics}) {

  const createTopicButtons = () => {
    return(
      topics.map((topic, index) => (
        <button>{topic.topic}</button>
      ))
    )
  };

  return (
    <div className="Course-Description-Container">
        <div className='Course-Meta-Container'>
            <text>Category</text>
            <button>{category.category}</button>
            <text>Topics</text>
            <div>
              {createTopicButtons()}
            </div>
        </div>
        <h2>Description</h2>
        <p>{description}</p>
    </div>
  );
}

export default CourseDescription;