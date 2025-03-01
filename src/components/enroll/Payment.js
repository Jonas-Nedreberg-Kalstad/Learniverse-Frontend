import '../../App.css';
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import OrderOverview from './OrderOverview';
import PaymentInformation from './PaymentInformation';
import { Get, Post } from '../../utils/fetch';
import EnrollSuccess from './EnrollSuccess';

function Payment() {

  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [paymentData, setPaymentDate] = useState(null);
  const [isEnrolled, setisEnrolled] = useState(false);

  const handleResponse = (response) => {
    setCourseData(response.data);
  };

  useEffect(() => {
    Get(`api/anonymous/courses/${id}`, handleResponse);
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
      Post("api/user/orders/create", paymentData, handlePaymentResponse)
    }
  }, [paymentData])

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'64px'}}>
        {isEnrolled ? 
          (<EnrollSuccess data={courseData}/>) 
          : 
          (
            <>
            <OrderOverview data={courseData}/>
            <PaymentInformation data={courseData} onSubmit={setPaymentDate}/>
            </>
          )
        }
    </div>
  );
}

export default Payment;