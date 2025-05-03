import '../../App.css';
import './Search.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterDrowdown from './FilterDropdown';
import PriceSlider from './PriceSlider';
import SearchTopic from './SearchTopic';
import SearchResultCard from './SearchResultCard';
import Pager from './Pager';
import { Fetch } from '../../service/apiService';
import searchService from '../../service/searchService';

// initialize the different category options
const categoryOptions = [
  'Information Technologies',
  'Digital Marketing',
  'Business and Entrepreneurship',
  'Data Science and Analytics'
];

// initialize the different level options
const levelOptions = ['Beginner', 'Intermediate', 'Expert'];

// Gets the index of the category selected in the category list, adds 1 to find the category's ID to filter with.
// Returns null if that category does not exist.
const getCategoryID = (category) => categoryOptions.indexOf(category) + 1 || null;

// Gets the index of the level selected in the level list, adds 1 to find the level's ID to filter with.
// Returns null if that level does not exist.
const getLevelID = (level) => levelOptions.indexOf(level) + 1 || null;

// Parses the topics parameters and constructs it as an array of objects, 
// as they have a set structure in the URL parameters: "?topics:{TopicName1}:{TopicID1},{TopicName2}:{TopicID2}..."
// returns null if no parameters are found.
const parseTopicParams = (topicParams) => {
  if (!topicParams || topicParams === 'null') return null;
  return topicParams.split(',').map(topic => {
    const [topicName, id] = topic.split(':');
    return { topic: topicName, id };
  });
};

// Uses an array of topic objects to construct the parameter string to be used in the URL,
// returns a string of: "{TopicName1}:{TopicID1},{TopicName2}:{TopicID2}..."
const createTopicParams = (selectedTopics) => {
  return selectedTopics?.map(({ topic, id }) => `${topic}:${id}`).join(',') || null;
};

const parsePriceParam = (parameter) => {
  const parsedPrice = parseInt(parameter, 10)
  return isNaN(parsedPrice) ? null : parsedPrice;
}

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || null); // uses the URL parameters if they exist
  const [selectedTopics, setSelectedTopics] = useState(parseTopicParams(searchParams.get("topics"))); // uses the URL parameters if they exist
  const [selectedLevel, setSelectedLevel] = useState(searchParams.get("level") || null);
  const [selectedCertified, setSelectedCertified] = useState("");
  const [results, setResults] = useState([]);
  const [resultCount, setResultCount] = useState(0);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [price, setPrice] = useState(parsePriceParam(searchParams.get("maxprice"))); // Attempts to parse the parameter as an int, if not an int return null.

  // If the search parameters change, update the values to rerender the components to reflect this.
  useEffect(() => {
    setSelectedTopics(parseTopicParams(searchParams.get("topics")));
    setSelectedCategory(searchParams.get("category"));
  }, [searchParams]);

  // If any search filter changes send a new search request to the backend.
  useEffect(() => {
    setSearchParams({
      topics: createTopicParams(selectedTopics),
      category: selectedCategory,
      level: selectedLevel,
      maxprice: price,
      page: page
    });
    fetchResults();
  }, [selectedCategory, selectedTopics, price, selectedLevel, page]);

  const handleResponse = (response) => {
    setResultCount(response.data.resultsFound);
    setResults(Array.isArray(response.data.courses) ? response.data.courses : []);
  }

  // general asynchronous post method to fetch and update the search result array.
  const fetchResults = async () => {
    const requestData = {
      categoryId: getCategoryID(selectedCategory),
      topicIds: selectedTopics?.map(({ id }) => id) || null,
      difficultyLevelId: getLevelID(selectedLevel),
      maxPrice: price
    };

    console.log(requestData);

    searchService.findCourseByFilteringIdsAndMaxPrice(requestData, handleResponse, page);
  };

  return (
    <main className="Search-Container">
      <aside className='Filter-Container'>
        <FilterDrowdown name="Category" selectedOption={selectedCategory} options={categoryOptions} onSelectedOption={setSelectedCategory} />
        <h3>Topics</h3>
        <SearchTopic initializeTopics={selectedTopics} onSelectedTopics={setSelectedTopics} />
        <PriceSlider price={price} onChangePrice={setPrice} />
        <FilterDrowdown name='Level' options={levelOptions} selectedOption={selectedLevel} onSelectedOption={setSelectedLevel} />
      </aside>
      <section className='Results-Container'>
        <text>Results: {resultCount}</text>
        {results.map((course, index) => (
          <SearchResultCard course={ course }/>
        ))}
        <Pager initializeValue={page} resultCount={resultCount} onValueChange={setPage} />
      </section>
    </main>
  );
}

export default Search;