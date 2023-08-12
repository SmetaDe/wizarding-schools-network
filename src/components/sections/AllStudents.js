import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useStudentContext } from "../Context/StudentContext";
import Student from "./Student";
import NewStudent from "../forms/NewStudentForm";

export default function AllStudents() {
    const {allStudents, setAllStudents} = useStudentContext();
  //  const [students, setStudents] = useState(allStudents);

const handleAddStudent = (newStudent) => {
    setAllStudents((prevStudents) => [...prevStudents, newStudent]);
};

const handleDeleteStudent = async (id) => {
    try {
        await axios.delete(`/api/Student/${id}`);

        console.log(1);
        setAllStudents((prevStudents) => { 
            console.log(prevStudents)
            return prevStudents.filter(student => student.id !== id );
        });
    }   catch (error) {
        console.error("could not delete student:",error);
    }
};
    return (
        <>
        <h1>All Students</h1>
        <ul id = "main">
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