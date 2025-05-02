import '../../App.css';
import { OpenModal } from '../common/modal/Modal';

function WantToTeach() {
  return (
    <div className="WTT-Container">
        <h2>Partner with Us</h2>
        <p className="WTT-Paragraph">
            <strong>Learniverse Connect</strong> is a platform built to help academic institutions extend their reach by showcasing their courses in a centralized, easy-to-navigate environment. We understand the challenge of standing out in an increasingly crowded digital learning space—our solution is to bring together diverse educational offerings under one roof, making it simple for students to explore, compare, and enroll in courses that meet their needs.
        </p>
        <p className="WTT-Paragraph">
            By partnering with us, your institution gains visibility among a wider audience of motivated learners who are actively searching for quality education opportunities. Our platform is designed to make course discovery effortless while giving institutions the tools they need to manage and promote their offerings effectively.
        </p>
        <p className="WTT-Paragraph">
            Getting started is easy. Simply create an account and visit the "Create a Course" page to begin listing your programs. Whether you offer short-term workshops, certifications, or full-degree programs, Learniverse Connect provides the infrastructure to help your courses get discovered.
        </p>
        <p className="WTT-Paragraph">
            If you have any questions or would like to learn more about how we can support your institution, please don’t hesitate to contact us. We’re here to help you connect with the learners who are looking for exactly what you offer.
        </p>
        <button style={{width:'90%', maxWidth:'512px'}} onClick={() => OpenModal(<>
                                                                                  <h2>Contact Information</h2>
                                                                                  <div>Email: support@learniverseconnect.com</div>
                                                                                  <p>Please send us an email if you have any questions or business inquiries.</p>
                                                                                </>)}>Contact Us</button>
    </div>
  );
}

export default WantToTeach;