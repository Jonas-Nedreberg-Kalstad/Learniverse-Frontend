import '../App.css';

function CourseCard({imgLink, title, creator}) {
  return (
    <div className="Course-Card-Container">
      <img src={imgLink}/>
      <text>{title}</text>
      <text>{creator}</text>
    </div>
  );
}

export default CourseCard;