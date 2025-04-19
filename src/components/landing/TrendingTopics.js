import '../../App.css';
import TopicCard from './TopicCard.js';
import { useNavigate } from "react-router-dom";

function TrendingTopics() {

  const navigate = useNavigate();

  return (
    <div className="Trending-Topics-Container">
        <h2>Explore topics</h2>
        <div style={{display:'flex', flexDirection:'row', gap:'16px', flexWrap:'wrap', justifyContent:'center'}}>
            <div>
                <TopicCard topic={{id:20, topic:"python"}}/>
                <TopicCard topic={{id:1, topic:"java"}}/>
                <TopicCard topic={{id:11, topic:"Azure"}}/>
                <TopicCard topic={{id:2, topic:"real-time programming"}}/>
                <TopicCard topic={{id:5, topic:"SQL"}}/>
            </div>
            <div>
                <TopicCard topic={{id:8, topic:"web"}}/>
                <TopicCard topic={{id:9, topic:".net"}}/>
                <TopicCard topic={{id:10, topic:"C#"}}/>
                <TopicCard topic={{id:12, topic:"cloud services"}}/>
                <TopicCard topic={{id:22, topic:"data science"}}/>
            </div>
        </div>
        <a href='' onClick={() => navigate("/search")}>Explore all our topics</a>
    </div>
  );
}

export default TrendingTopics;