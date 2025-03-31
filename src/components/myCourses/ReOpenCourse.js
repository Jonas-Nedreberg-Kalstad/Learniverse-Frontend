import React, { useState } from 'react';
import { notify } from '../Toaster';
import courseService from '../../service/courseService';
import { CloseModal } from '../Modal';

function OpenCourse({course, onSubmit}) {

    const [courseData, setCourseData] = useState(course);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const validateDate = () => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if(start < now) {
            notify("ERROR", "Start date cannot be before today.");
            return false;
        }

        if(end < start) {
            notify("ERROR", "End date must be after start date.");
            return false;
        }

        return true;
    }

    const handleInput = (event) => {
        const {name, value} = event.target;

        if(name === "startDate") {
            setStartDate(value);
        }
        if(name === "endDate") {
            setEndDate(value);
        }
    }

    const handleResponse = (response) => {
        if(response.status == 200) {
            notify("SUCCESS", "Course has been successfully opened.");
            onSubmit();
            CloseModal();
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(!validateDate()) return;

        const start = new Date(startDate);
        const end = new Date(endDate);

        courseService.updateCourse(courseData.id, {...courseData, active:true, startDate:start, endDate:end}, handleResponse);
    }

    return (
        <form className="Re-Open-Course-Container" onSubmit={handleSubmit}>
            <h2>Select new dates</h2>
            <div style={{display: "flex", flexDirection: "row", gap:'16px', justifyContent: "space-between"}}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <label>Start Date:</label>
                    <input type='date' name='startDate' value={startDate} onChange={handleInput} required />
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <label>End Date:</label>
                    <input type='date' name='endDate' value={endDate} onChange={handleInput} required />
                </div>
            </div>
            <button type="submit">Confirm</button>
        </form>
    )
}

export default OpenCourse;