import { update } from "lodash";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MyCoursesFilter({ onFilterChange }) {

  const navigate = useNavigate();

  const [paramData, setParamData] = useState({
    current: false,
    upcoming: false,
    passed: false,
    deactivated: false,
  });

  const handleCheckboxChange = (name) => {
    const updatedParamData = {
      current: false,
      upcoming: false,
      passed: false,
      deactivated: false,
      [name]: true, // Only the selected checkbox is set to true
    };
    setParamData(updatedParamData);
    onFilterChange(updatedParamData); // Push updated data to the parent component
  };

  return (
    <aside style={{maxWidth:'320px'}}>
      <h3>Filter</h3>
      <div className="My-Course-Filter-Container">
        <p>Show only:</p>
        <div style={{display:'flex', flexDirection:'row', width:'100%', alignItems:'center', cursor:'pointer'}} onClick={() => handleCheckboxChange("current")}>
          <input
            type="checkbox"
            name="current"
            className="checkbox"
            checked={paramData.current}
            onChange={handleCheckboxChange}
          />
          <p>Current courses</p>
        </div>
        <div style={{display:'flex', flexDirection:'row', width:'100%', alignItems:'center', cursor:'pointer'}} onClick={() => handleCheckboxChange("upcoming")}>
          <input
            type="checkbox"
            name="upcoming"
            className="checkbox"
            checked={paramData.upcoming}
            onChange={handleCheckboxChange}
          />
          <p>Up-coming courses</p>
        </div>
        <div style={{display:'flex', flexDirection:'row', width:'100%', alignItems:'center', cursor:'pointer'}} onClick={() => handleCheckboxChange("passed")}>
          <input
            type="checkbox"
            name="passed"
            className="checkbox"
            checked={paramData.passed}
            onChange={handleCheckboxChange}
          />
          <p>Passed courses</p>
        </div>
        <div style={{display:'flex', flexDirection:'row', width:'100%', alignItems:'center', cursor:'pointer'}} onClick={() => handleCheckboxChange("deactivated")}>
          <input
            type="checkbox"
            name="deactivated"
            className="checkbox"
            checked={paramData.deactivated}
          />
          <p>Deactivated courses</p>
        </div>
      </div>
      <br/>
      <button onClick={() => navigate('/create-course')}>Create New Course</button>
    </aside>
  );
}

export default MyCoursesFilter;