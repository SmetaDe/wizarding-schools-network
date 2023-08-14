import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStudentContext } from "../Context/StudentContext";
import { useSchoolContext } from "../Context/SchoolContext";
import { Link } from "react-router-dom";
import UpdateStudent from "../forms/UpdateStudentForm";

export default function Student() {
    const { id } = useParams();
    const studentId = parseInt(id);
    const { singleStudent, setSingleStudent } = useStudentContext();
    const { allStudents, allSchools } = useStudentContext();
    const thisStudent = allStudents.find(student => student.id === studentId);
    const studentSchool = allSchools.find(school => school.id === thisStudent.SchoolId);

    useEffect(() => {
        async function fetchStudentDetails() {
            try {
                const { data } = await axios.get(`/api/Student/${id}`);
                setSingleStudent(data);
            } catch (error) {
                console.error("Error fetching student details:", error);
            }
        }

        fetchStudentDetails();
    }, [id]);

    if (!singleStudent) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{singleStudent.firstName}</h2>
            <p> Email: {singleStudent.email} </p>
            <p> GPA: {singleStudent.gpa} </p>
            <p> Enrolled in <Link to={`/Wizarding-schools/${studentSchool.id}`}>{studentSchool.name}</Link></p>
            <img src={singleStudent.imageURL} alt={`Portrait of ${singleStudent.firstName}`} />
            <div>
                <h2>Update Student</h2>
                <UpdateStudent student={singleStudent} />
            </div>
        </div>
    );
}
