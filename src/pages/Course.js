import '../App.css';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import CourseMain from '../components/CourseMain.js';
import CourseDescription from '../components/CourseDescription.js';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Get } from '../utils/fetch.js';

function CoursePage() {

  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    //setCourseData(JSON.parse('{"id":1,"courseName":"Real-Time Programming in Java","price":29999.00,"description":"Embark on a transformative learning experience with our expert-level online course, RealTime Programming in Java. Designed for seasoned developers and Java enthusiasts seeking mastery in real-time applications, this advanced course delves deep into the intricacies of leveraging Java for mission-critical systems. Explore cutting-edge concepts such as multithreading, synchronization, and  low-latency programming, equipping you with the skills needed to build responsive and robust real-time solutions. Led by industry experts with extensive hands-on experience, this course combines theoretical insights with practical application, ensuring you not only grasp the theoretical underpinnings but also ain the proficiency to implement real-time solutions confidently. Elevate your Java programming expertise to new heights and stay ahead in the ever-evolving landscape of real-time systems with our comprehensive and immersive course.","requirementDescription":null,"courseUrl":null,"courseImageUrl":null,"startDate":"2025-06-03T00:00:00","endDate":"2025-06-28T00:00:00","created":"2025-03-22T20:31:00.784722","updated":null,"active":true,"averageRating":3.1,"numberOfReviews":10,"category":{"id":1,"category":"Information Technologies"},"credit":{"id":1,"credit":7.50},"currency":{"id":1,"currency":"NOK"},"difficultyLevel":{"id":3,"type":"Expert"},"hoursPerWeek":{"id":2,"hours":40},"topics":[{"id":2,"topic":"real-time programming"},{"id":4,"topic":"programming"},{"id":3,"topic":"multi-threading"},{"id":1,"topic":"Java"}],"relatedCertificates":[{"id":1,"certificateName":"Java SE 17 Programmer Professional"}]}'))
    console.log(courseData);
      const fetchData = async () => {
        let responseData = await Get(`api/anonymous/courses/${id}`);
        setCourseData(responseData);
      }
      
      fetchData();
  }, [])

  console.log(courseData);

  if(courseData == null) {
    return <text>Loading...</text>
  }

  return (
    <div className="App">
      <Header />
      <CourseMain id={id} title={courseData.courseName} creator={courseData.createdBy} price={courseData.price} currency={courseData.currency.currency} rating={courseData.averageRating} reviewAmount={courseData.numberOfReviews} />
      <CourseDescription description={courseData.description} category={courseData.category} topics={courseData.topics} />
      <Footer />
    </div>
  );
}

export default CoursePage;