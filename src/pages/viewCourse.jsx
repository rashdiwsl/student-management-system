import { useState, useEffect } from 'react';

function EnrolledCourses({ email }) {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch(`/students/courses?email=${email}`)
            .then(response => response.json())
            .then(data => setCourses(data));
    }, [email]);

    return (
        <div>
            <h3>Enrolled Courses</h3>
            <ul>
                {courses.map(course => (
                    <li key={course.id}>{course.name} - {course.description}</li>
                ))}
            </ul>
        </div>
    );
}
