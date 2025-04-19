import { useNavigate } from 'react-router-dom';
import '../../App.css';

function TopicCard({topic}) {

  const navigate = useNavigate();

  return (
    <div className="Topic-Card-Container" onClick={() => navigate(`/search?topics=${topic.topic}:${topic.id}`)}>
      <p>{topic.topic}</p>
    </div>
  );
}

export default TopicCard;