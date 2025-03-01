import '../../App.css';
import TopicCard from './TopicCard.js';
import { useNavigate } from "react-router-dom";

function TrendingTopics() {

  const navigate = useNavigate();

  return (
    <div className="Trending-Topics-Container">
        <h2>Trending topics</h2>
        <div style={{display:'flex', flexDirection:'row', gap:'16px'}}>
            <div>
                <TopicCard topic="Python"/>
                <TopicCard topic="Java"/>
                <TopicCard topic="Azure"/>
                <TopicCard topic="Painting"/>
                <TopicCard topic="Video editing"/>
            </div>
            <div>
                <TopicCard topic="Music composition"/>
                <TopicCard topic="Business analytics"/>
                <TopicCard topic="Leadership"/>
                <TopicCard topic="Project planning"/>
                <TopicCard topic="Game development"/>
            </div>
        </div>
        <a href='' onClick={() => navigate("/search")}>View all popular topics</a>
    </div>
  );
}

export default TrendingTopics;