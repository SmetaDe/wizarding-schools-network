import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useStudentContext } from "../Context/StudentContext";
import NewStudent from "../forms/NewStudentForm";

export default function AllStudents() {
    const { allStudents, setAllStudents } = useStudentContext();

    const handleAddStudent = (newStudent) => {
        setAllStudents((prevStudents) => [...prevStudents, newStudent]);
    };

    const handleDeleteStudent = async (id) => {
        try {
            await axios.delete(`/api/Student/${id}`);
            setAllStudents((prevStudents) => prevStudents.filter(student => student.id !== id));
        } catch (error) {
            console.error("Could not delete student:", error);
        }
    };

    return (
        <>
            <h1>All Students</h1>
            <ul id="main">
                {allStudents.map((student) => (
                    <li key={student.id}> 
                        <Link to={`/Students/${student.id}`}>{student.firstName}</Link> <br />
                        <button onClick={() => handleDeleteStudent(student.id)}>Delete Student</button>
                    </li>
                ))}
            </ul>
            <h2>Add Another Student</h2>
            <NewStudent onAddStudent={handleAddStudent}/>
        </>
    );
}
