import '../App.css';
import { useNavigate } from "react-router-dom";

function CourseCard({imgLink, title, creator}) {

  const navigate = useNavigate();

  return (
    <div className="Course-Card-Container" onClick={() => navigate("/course")}>
      <img style={{height:'128px', maxWidth:'192px'}} src={imgLink} alt='CourseImage'/>
      <text>{title}</text>
      <text>{creator}</text>
    </div>
  );
}

export default CourseCard;