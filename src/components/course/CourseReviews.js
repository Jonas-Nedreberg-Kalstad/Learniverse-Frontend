import { useNavigate } from 'react-router-dom';
import '../../App.css';
import Breadcrumps from './Breadcrumbs';
import Rating from '../common/rating/Rating';
import Tooltip from '../common/tooltip/Tooltip';
import { useState, useEffect } from 'react';
import courseService from '../../service/courseService';

function CourseReviews({ course }) {

    const [reviews, setReviews] = useState([]);

    const handleResponse = (response) => {
        if(response.status == 200) {
            setReviews(response.data);
            console.log(response.data);
        }
    }

    useEffect(() => {
      if (course && course.id) {
        courseService.getReviews(course.id, handleResponse);
      }
    }, [course]);

    const renderReviews = () => {
        return reviews.map((review, index) => (
            <div className='Review-Container'>
                <p>{review.review}</p>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'90%'}}>
                    <Rating rating={review.rating}/>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <p>{review.helpfulVotes}</p>
                        <img className='star-icon' src={require('../../public/assets/images/thumbsup-icon.png')} alt='Give helpful vote'/>
                    </div>
                </div>
            </div>
        ));
    }

  return (
    <section className='Review-Main-Container'>
        <div style={{display:'flex', flexDirection:'column', gap:'16px', width:'100%', maxWidth:'1024px', alignItems:'center'}}>
            <h2>Reviews</h2>
            {renderReviews()}
        </div>
    </section>
  );
}

export default CourseReviews;