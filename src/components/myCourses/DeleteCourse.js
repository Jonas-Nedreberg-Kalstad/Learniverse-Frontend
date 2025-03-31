import React from 'react';

function DeleteCourse() {
    return (
        <div className="Delete-Course-Container">
            <h2>Are you sure you want to delete this course?</h2>
            <button className="Delete-Course-Button">Yes</button>
            <button className="Cancel-Course-Button">No</button>
        </div>
    )
}

export default DeleteCourse;