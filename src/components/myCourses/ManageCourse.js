import React, { useState, useEffect } from "react";
import { redirect, useNavigate, useParams, useLocation } from "react-router-dom";
import courseService from "../../service/courseService"; // Assuming courseService is in services folder
import CourseDescription from "../course/CourseDescription";
import SearchTopic from "../search/SearchTopic"; // Assuming TopicSearch is in search folder
import InfoBanner from "../common/toaster/Toaster";
import { wrap } from "lodash";
import { notify } from "../common/toaster/Toaster"; // Assuming Toaster is in components folder

const placeholderImage = require("../../public/assets/images/placeholder-image.png");

function ManageCourse() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state?.course);

  const [image, setImage] = useState(location.state?.course.courseImageUrl || placeholderImage);
  const [toBePublished , setToBePublished] = useState(false);

  const [formData, setFormData] = useState(location.state?.course || {
    courseName: "",
    description: "",
    requirementDescription: "",
    courseUrl: "",
    courseImageUrl: "",
    startDate: "",
    endDate: "",
    price: 0,
    category: null,
    credit: null,
    currency: null,
    difficultyLevel: null,
    hoursPerWeek: null,
    topics: [],
    relatedCertificates: null,
    active: false,
  });

  const formatDate = (date) => {
    const d = new Date(date);
    
    // Check if the date is valid
    if (isNaN(d.getTime())) {
      return null; // or throw an error, or return an empty string
    }
  
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
  
    return `${year}-${month}-${day}`;
  };

  const setTopics = (topics) => {
    setFormData({ ...formData, topics: topics });
  };

  const createHourOptions = () => {
    const options = [];
    for (let i = 0; i <= 40; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  };

  const createCreditOptions = () => {
    const options = [];
    for (let i = 0; i <= 60; i++) {
      options.push(<option key={i} value={i}>{i/2}</option>);
    }
    return options;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if(name === "startDate" || name === "endDate") {
      const date = new Date(value);
      setFormData({ ...formData, [name]: date });
      console.log({ ...formData, [name]: date })
      return;
    }

    if(name === "category" || name === "currency" || name === "credit" || name === "difficultyLevel" || name === "hoursPerWeek") {
      const wrappedValue = {id:value};
      setFormData({ ...formData, [name]: wrappedValue });
      console.log({ ...formData, [name]: wrappedValue })
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setImage(value); // creates a preview
  };

  const handleSaveDraft = (response) => {
    if (response?.status === 201) {
      notify("SUCCESS", "Course has been saved as draft.");
      console.log("Course created successfully:", response.data);
      navigate("/my-courses");
      } else {
      console.error("Error creating course:", response.statusText);
    }
  };

  const verifyFormData = () => {
    if (!formData.courseName || formData.courseName.trim() === "") {
      notify("ERROR", "Course name is required.");
      return false;
    }
    if (!formData.description || formData.description.trim() === "") {
      notify("ERROR", "Description is required.");
      return false;
    }
    if (!formData.currency) {
      notify("ERROR", "Please select a currency.");
      return false;
    }

    //if (!formData.requirementDescription || formData.requirementDescription.trim() === "") {
    //  notify("ERROR", "Requirement description is required.");
    //  return false;
    //}

    if (!formData.courseUrl || formData.courseUrl.trim() === "") {
      notify("ERROR", "Course URL is required.");
      return false;
    }
    if (formData.hoursPerWeek === 0) {
      notify("ERROR", "Hours per week must be greater than 0.");
      return false;
    }
    if (!formData.topics || formData.topics.length === 0) {
      notify("ERROR", "At least one topic is required.");
      return false;
    }

    return true;
  };

  const handleUpdate = (response) => {
    if(response.status == 200) {
      notify("SUCCESS", "Course successfully updated!");
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const action = event.nativeEvent.submitter.value;

    if (!verifyFormData()) {
      return;
    }


    if(action === "save") {
      courseService.updateCourse(location.state.course.id, formData, handleUpdate);
      console.log(formData);
    }
    if(action === "saveNew") {
      courseService.createCourse(formData, handleSaveDraft);
    }
  };

  return (
    <main className="Create-Course-Container">

      <h2>Create a New Course</h2>

      <form className="Create-Course-Form" onSubmit={handleSubmit}>
        <div className="Create-Course-Image-Field-Container">

          <img 
            src={image.length > 0 ? image : setImage(placeholderImage)} 
            onError={() => setImage(placeholderImage)} 
            alt="Preview" 
            style={{aspectRatio:'3 / 2', objectFit:'cover', width:'100vw', maxWidth:'600px', maxHeight:'400px'}} 
          />
        
          <div className="Create-Course-Fields">

            <div className="Create-Course-Field">
              <p>Link to course:</p>
              <input type="text" name="courseUrl" value={formData.courseUrl} onChange={handleChange} required />
            </div>

            <div className="Create-Course-Field">
              <p>Image link:</p>
              <input type="text" name="courseImageUrl" value={formData.courseImageUrl} onChange={handleImageChange} required />
            </div>

            <div className="Create-Course-Field">
              <p>Course Name:</p>
              <input type="text" name="courseName" placeholder="Course Name" value={formData.courseName} onChange={handleChange} required />
            </div>

            <div className="Create-Course-Field">
              <p>Price:</p>
              <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
            </div>

            <div className="Create-Course-Field">
              <p>Currency:</p>
              <select name="currency" value={formData?.currency} onChange={handleChange} required>
                <option value={null} disabled={true} selected>select currency</option>
                <option value={1} >NOK</option>
              </select>
            </div>
            {/*}
            <div className="Create-Course-Field">
              <text>Start Date:</text>
              <input type="date" name="startDate" value={formatDate(formData.startDate)} onChange={handleChange} required />
            </div>

            <div className="Create-Course-Field">
              <text>End Date:</text>
              <input type="date" name="endDate" value={formatDate(formData.endDate)} onChange={handleChange} required />
            </div>
            */}

            <div className="Create-Course-Field">
              <p>Category:</p>
              <select name="category" value={formData?.category?.id} onChange={handleChange} required>
                <option value={0} disabled={true} selected>select category</option>
                <option value={1}>Information Technologies</option>
                <option value={2}>Digital Marketing</option>
                <option value={3}>Business and Entrepreneurship</option>
                <option value={4}>Data Science and Analytics</option>
              </select>
            </div>

            <div className="Create-Course-Field">
              <p>Difficulty:</p>
              <select name="difficultyLevel" value={formData?.difficultyLevel?.id} onChange={handleChange} required>
                <option value={0} disabled={true} selected>select difficulty</option>
                <option value={1}>Beginner</option>
                <option value={2}>Intermediate</option>
                <option value={3}>Expert</option>
              </select>
            </div>

            <div className="Create-Course-Field">
              <p>Hours Per Week:</p>
              <select name="hoursPerWeek" value={formData?.hoursPerWeek?.id} onChange={handleChange} required>
                {createHourOptions()}
              </select>
            </div>

            <div className="Create-Course-Field">
              <p>Credits:</p>
              <select name="credit" value={formData?.credit?.id} onChange={handleChange} required>
                {createCreditOptions()}
              </select>
            </div>
          </div>
        </div>

        <div className="Create-Course-Description">
          <h3>Topics</h3>
          <SearchTopic initializeTopics={formData.topics} onSelectedTopics={setTopics} />
          {/*
          <h3>Requirements</h3>
          <textarea name="requirementDescription" value={formData.requirementDescription} onChange={handleChange} style={{height:'320px', minWidth:'300px', maxWidth:'1024px'}} required />
          */}
          <h3>Description</h3>
          <textarea name="description" value={formData.description} onChange={handleChange} style={{height:'320px', minWidth:'300px', maxWidth:'1024px'}} required />
        </div>

        <div>
          <button onClick={() => {navigate("/my-courses")}}>Back</button>
          {!location.state?.course && 
            <button type="submit" value="saveNew">Create new Course</button>
          }
          {location.state?.course && <button type="submit" value="save">Save changes</button>}
        </div>
      
      </form>
    </main>
  );
}

export default ManageCourse;