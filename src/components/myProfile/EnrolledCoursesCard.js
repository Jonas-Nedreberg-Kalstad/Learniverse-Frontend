import '../../App.css';
import { useNavigate } from "react-router-dom";
import Rating from '../Rating';
import Duration from '../enroll/Duration';
import { useState, useEffect } from 'react';
import { CloseModal, OpenModal } from '../Modal';
import courseService from '../../service/courseService';
import { notify } from '../Toaster';

function EnrolledCoursesCard({ course }) {

  const navigate = useNavigate();

  const [image, setImage] = useState(require('../../public/assets/images/placeholder-image.png'));

  useEffect(() => {
    if(course) {
      const img = new Image();

      img.onload = () => {
        // Image is valid
        setImage(course.courseImageUrl);
      };
    }
  }, [course]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const handleResponse = (response) => {
    if(response.status == 201) {
      notify("SUCCESS", "Review has been published");
      CloseModal();
    }
  }

  const createReview = (reviewData) => {
    reviewData["courseId"] = course.id;
    courseService.createReview(reviewData, handleResponse);
  }

  return (
    <div className="Search-Result-Card-Container">
      <img style={{borderRadius:'5px 0px 0px 5px'}} src={image} alt='CourseImage'/>

      <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'8px', maxWidth:'320px', flexGrow:'1'}}>
        <text>{course.courseName}</text>
        {new Date() < new Date(course.endDate) && <Duration courseStartDate={course.startDate} courseEndDate={course.endDate}/>}
        {new Date() > new Date(course.endDate) && <><b>Ended: {formatDate(course.endDate)}</b><button onClick={() => OpenModal(<CreateReview onSubmit={createReview}/>)}>Review Course</button></>}
        <div style={{display:'flex', flexDirection:'row', gap:'64px', justifyContent:'space-between', width:'100%'}}>
          <text>{course.provider.providerName}</text>
          <a href={course?.provider?.providerUrl}>Go to Provider ></a>
        </div>
      </div>

    </div>
  );
}

export default EnrolledCoursesCard;

function CreateReview({ course, onSubmit }) {

  const [reviewDataForm, setReviewDataForm] = useState({
    rating: 0,
    review: "",
  });

  useEffect(() => {
    if(course) {
      setReviewDataForm((prev) => ({
        ...prev,
        courseId: course.id
      }));
    }
  }, [course]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReviewDataForm((prev) => ({
        ...prev,
        [name]: value
    }));
  }

  const handleRatingChange = (value) => {
    setReviewDataForm((prev) => ({
        ...prev,
        rating: value
    }));
    console.log(value); 
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(reviewDataForm);

    if(reviewDataForm.rating < 1) {
      notify("ERROR", "Please select a rating");
      return;
    }

    if(reviewDataForm.review === '') {
      notify("ERROR", "Please write a review");
      return;
    } 

    onSubmit(reviewDataForm);
  }

  return (
    <form style={{display:'flex', flexDirection:'column', gap:'16px'}} onSubmit={handleSubmit}>
      <h2>Create Review</h2>
      <div>
        <h4>Select Rating</h4>
        <img style={{width:'32px', height:'32px', cursor:'pointer'}} onClick={() => handleRatingChange(1)} src={require(reviewDataForm.rating >= 1 ? '../../public/assets/images/full-star-icon.png' : '../../public/assets/images/empty-star-icon.png')}/>
        <img style={{width:'32px', height:'32px', cursor:'pointer'}} onClick={() => handleRatingChange(2)} src={require(reviewDataForm.rating >= 2 ? '../../public/assets/images/full-star-icon.png' : '../../public/assets/images/empty-star-icon.png')}/>
        <img style={{width:'32px', height:'32px', cursor:'pointer'}} onClick={() => handleRatingChange(3)} src={require(reviewDataForm.rating >= 3 ? '../../public/assets/images/full-star-icon.png' : '../../public/assets/images/empty-star-icon.png')}/>
        <img style={{width:'32px', height:'32px', cursor:'pointer'}} onClick={() => handleRatingChange(4)} src={require(reviewDataForm.rating >= 4 ? '../../public/assets/images/full-star-icon.png' : '../../public/assets/images/empty-star-icon.png')}/>
        <img style={{width:'32px', height:'32px', cursor:'pointer'}} onClick={() => handleRatingChange(5)} src={require(reviewDataForm.rating >= 5 ? '../../public/assets/images/full-star-icon.png' : '../../public/assets/images/empty-star-icon.png')}/>
      </div>
      <div>
        <h4>Review Comment</h4>
        <textarea style={{maxWidth:'320px', height:'128px'}} placeholder='Write a review' name='review' value={reviewDataForm.review} onChange={handleChange}></textarea>
      </div>
      <button type='submit'>Publish Review</button>
    </form>
  )
}