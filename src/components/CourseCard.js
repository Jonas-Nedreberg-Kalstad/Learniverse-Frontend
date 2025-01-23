import '../App.css';

function CourseCard({imgLink, title, creator}) {
  return (
    <div className="Course-Card-Container">
      <img style={{height:'128px', maxWidth:'192px'}} src={imgLink} alt='CourseImage'/>
      <text>{title}</text>
      <text>{creator}</text>
    </div>
  );
}

export default CourseCard;