import '../../App.css';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';
import { Fetch } from '../../service/apiService';
import searchService from '../../service/searchService';

function SearchTopic({ initializeTopics, onSelectedTopics }) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchResult, setSearchResult] = useState({});
  const [isDebouncedFinished, setIsDebouncedFinished] = useState(false);
  const [topics, setTopics] = useState(initializeTopics || []);

  // If a variable used in the parent changes, reflect this in the component.
  useEffect(() => {
    setTopics(initializeTopics || []);
  }, [initializeTopics]);

  // Handles when the input field changes.
  const handleInputChange = useCallback((event) => {
    const value = event.target.value;
    setInputValue(value);
    setIsFocused(value.trim().length > 1);
    setIsDebouncedFinished(false);
  }, []);

  // Upon clicking on a result add this to the topic list and pass it to the parent.
  const handleAddTopic = useCallback((topic) => {
    setTopics((prevTopics) => {
      // checks if the topic being added does not already exist in the list.
      if (!prevTopics.some((t) => t.id === topic.id)) {
        const updatedTopics = [...prevTopics, topic];
        onSelectedTopics(updatedTopics.length ? updatedTopics : null); // if the list is not empty: return the list. If not: return null
        return updatedTopics;
      }
      return prevTopics;
    });
  }, [onSelectedTopics]);

  // Removes a topic from the list and passes the updated list to the parent
  const removeTopic = useCallback((topic) => {
    setTopics((prevTopics) => {
      const updatedTopics = prevTopics.filter((t) => t.id !== topic.id); // if the removed id is in the list filter it out.
      onSelectedTopics(updatedTopics.length ? updatedTopics : null); // if the list is not empty: return the list. If not: return null
      return updatedTopics;
    });
  }, [onSelectedTopics]);

  // when the input field is focused or the input value changes and length is larger than 1 show the results body.
  const showResults = useCallback(() => {
    if (inputValue.trim().length > 1) {
      setIsFocused(true);
    }
  }, [inputValue]);

  const handleResponse = (response) => {
    setSearchResult(response.data);
    console.log(response.data);
  }

  // method to start a debounced search request to the backend with a 500ms timer.
  const debouncedSearch = useCallback(
    debounce(async (input) => {
      try {

        const data = {
          courseName: '',
          categoryName: '',
          topicName: input
        };

        await searchService.topicSearch(data, handleResponse);

      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setIsDebouncedFinished(true);
      }
    }, 500), []);

  // Trigger a debounced search when the input changes. 
  // If the user continues typing within 500ms, the timer resets, ensuring only the final input is sent to the backend to prevent excessive API calls.
  useEffect(() => {
    if (inputValue.trim().length > 1) {
      debouncedSearch(inputValue);
    }
    return () => {
      debouncedSearch.cancel(); // Cancel previous debounced search
    };
  }, [inputValue, debouncedSearch]);

  // Render the results already found to avoid having to send the same search request.
  const renderResults = useMemo(() => {
    if (searchResult.length > 0) {
      return searchResult.map((topic, index) => (
        <p key={index} onClick={() => handleAddTopic(topic.topic)}>
          {topic.topic.topic}
        </p>
    ));
    }
    return <p>No results</p>;
  }, [searchResult, handleAddTopic]);

  return (
    <section className="Topic-Search-Container">
      <div className='Search-Bar-Container'>
        <div className='Search-Bar-Input-Container'>
          <input
            className='Search-Input'
            type='text'
            placeholder='Search for topic'
            onBlur={() => setTimeout(() => setIsFocused(false), 250)}
            onFocus={showResults}
            onChange={handleInputChange}
          />
        </div>
        {isFocused && isDebouncedFinished && (
          <div className='Search-Bar-Result-Container'>{renderResults}</div>
        )}
      </div>
      <div className='Selected-Topics-Container'>
        {topics.map((topic, index) => (
          <button key={index} onClick={() => removeTopic(topic)}>
            {topic.topic}
          </button>
        ))}
      </div>
    </section>
  );
}

export default SearchTopic;