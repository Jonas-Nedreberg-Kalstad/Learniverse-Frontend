import '../App.css';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Post } from "../utils/fetch";
import { debounce } from 'lodash';

function SearchBar() {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchResult, setSearchResult] = useState({});
  const [isDebouncedFinished, setIsDebouncedFinished] = useState(false);

  const handleInputChange = useCallback((event) => {
    const value = event.target.value;
    setInputValue(value);
    setIsFocused(value.trim() !== "" && value.trim().length > 1);
    setIsDebouncedFinished(false);
  }, []);

  const search = useCallback(() => {
    if (inputValue.trim() !== "") {
      setIsFocused(true);
    }
  }, [inputValue]);

  const debouncedSearch = useCallback(
    debounce(async (input) => {
      try {
        const responseData = await Post("api/anonymous/search", {
          courseName: input,
          categoryName: input,
          topicName: input
        });
        setSearchResult(responseData);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsDebouncedFinished(true);
      }
    }, 500), []);

  useEffect(() => {
    if(inputValue.trim().length > 1){
      debouncedSearch(inputValue);
    }
    
    return () => {
      debouncedSearch.cancel();
    };
  }, [inputValue, debouncedSearch])

  const renderResults = useMemo(() => {
    const resultList = [];

    if(typeof searchResult === "object") {

      if(searchResult.scoredCategories != null && searchResult.scoredCategories.length > 0) {
        searchResult.scoredCategories.map((category, index) => {
        resultList.push(<p>Category: {category.category}</p>);
        });
      }
      
      if(searchResult.scoredTopics != null && searchResult.scoredTopics.length > 0) {
        searchResult.scoredTopics.map((topic, index) => {
          resultList.push(<p>Topic: {topic.topic.topic}</p>);
        });
      }

      if(searchResult.scoredCourses != null && searchResult.scoredCourses.length > 0) {
        searchResult.scoredCourses.map((course, index) => {
          resultList.push(<p onClick={() => {navigate(`/course/${course.course.id}`)}}>Course: {course.course.courseName}</p>);
        });
      }
    }

    return resultList;
  }, [searchResult]);

  return (
    <div className="Search-Bar-Container">
        <div className='Search-Bar-Input-Container' >
          <img src={require("../assets/images/search-icon.png")} style={{height:'75%'}} />
          <input onBlur={() => {setTimeout(() => {setIsFocused(false)}, 250)}} onFocus={search} onChange={handleInputChange} className='Search-Input' type='text' placeholder='Search' />
        </div>
        {isFocused && isDebouncedFinished && (<div className='Search-Bar-Result-Container'>
          {renderResults}
        </div>)}
    </div>
  );
}

export default SearchBar;