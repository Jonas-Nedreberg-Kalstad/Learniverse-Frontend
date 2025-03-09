import '../../App.css';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { debounce } from 'lodash';
import { Fetch } from '../../service/apiService';
import searchService from '../../service/searchService';

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

  const handleResponse = (response) => {
    setSearchResult(response.data);
    console.log(response.data);
  }

  const debouncedSearch = useCallback(
    debounce(async (input) => {
      try {
        const data = {
          courseName: input,
          categoryName: input,
          topicName: input
        };
        searchService.multiParameterSearch(data, handleResponse);
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
      
      if(searchResult.scoredCourses != null && searchResult.scoredCourses.length > 0) {
        searchResult.scoredCourses.map((course, index) => {
          if(index < 3) {
            resultList.push(<CourseSearchResultCard course={course.course}/>);
            return;
          }
        });
      }

      if(searchResult.scoredCategories != null && searchResult.scoredCategories.length > 0) {
        searchResult.scoredCategories.map((category, index) => {
          if(index < 1) {
            resultList.push(<p style={{cursor:'pointer'}} onClick={() => {navigate(`/search?category=${category.category.category}`)}}><b>Category:</b> {category.category.category}</p>);
            return;
          }
        });
      }
      
      if(searchResult.scoredTopics != null && searchResult.scoredTopics.length > 0) {
        searchResult.scoredTopics.map((topic, index) => {
          if(index < 3) {
            resultList.push(<p style={{cursor:'pointer'}} onClick={() => {navigate(`/search?topics=${topic.topic.topic}:${topic.topic.id}`)}}><b>Topic:</b> {topic.topic.topic}</p>);
            return;
          }
        });
      }

    } else {
      return <p>No results</p>
    }

    return resultList;
  }, [searchResult]);

  return (
    <div className="Search-Bar-Container">
        <div className='Search-Bar-Input-Container' >
          <img className='star-icon' src={require("../../public/assets/images/search-icon.png")} alt='Search' />
          <input onBlur={() => {setTimeout(() => {setIsFocused(false)}, 250)}} onFocus={search} onChange={handleInputChange} className='Search-Input' type='text' placeholder='Search' />
        </div>
        {isFocused && isDebouncedFinished && (<div className='Search-Bar-Result-Container'>
          {renderResults}
        </div>)}
    </div>
  );
}

export default SearchBar;

function CourseSearchResultCard({ course }) {

  const navigate = useNavigate();

  return (
    <div style={{cursor:'pointer', display:'flex', flexDirection:'column'}} onClick={() => {navigate(`/course/${course.id}`)}}>
      <div style={{display:'flex', flexDirection:'row'}}>
        <img style={{maxHeight:'64px'}} src={course.courseImageUrl}/>
        <p>{course.courseName}</p>
      </div>
      <div style={{cursor:'pointer', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
        <p>{course.provider.providerName}</p>
        <b>{course.price} {course.currency.currency}</b>
      </div>
    </div>
  )
}