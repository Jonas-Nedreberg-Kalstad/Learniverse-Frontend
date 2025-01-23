import '../App.css';
import TopicCard from './TopicCard.js';

function TrendingTopics() {
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
    </div>
  );
}

export default TrendingTopics;