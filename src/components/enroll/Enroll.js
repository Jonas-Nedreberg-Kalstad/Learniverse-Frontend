import '../../App.css';
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import OrderOverview from './OrderOverview';
import PaymentInformation from './PaymentInformation';
import EnrollSuccess from './EnrollSuccess';
import courseService from '../../service/courseService';
import enrollService from '../../service/enrollService';

function Payment() {

  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [paymentData, setPaymentDate] = useState(null);
  const [isEnrolled, setisEnrolled] = useState(false);

  const handleResponse = (response) => {
    setCourseData(response.data);
  };

  useEffect(() => {
    courseService.getCourse(id, handleResponse)
  }, [id])

  const handlePaymentResponse = (data) => {
    const status = data.status;

    switch(status) {
      case 201:
        setisEnrolled(true);
        break;
      default:
        console.error("Unknown error during payment");
        break;
    }
  }

  useEffect(() => {
    if(paymentData != null) {
      enrollService.enroll(paymentData, handlePaymentResponse);
    }
  }, [paymentData])

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'64px'}}>
        {isEnrolled ? 
          (<EnrollSuccess data={courseData}/>) 
          : 
          (
            <>
            <OrderOverview course={courseData}/>
            <PaymentInformation data={courseData} onSubmit={setPaymentDate}/>
            </>
          )
        }
    </div>
  );
}

export default Payment;