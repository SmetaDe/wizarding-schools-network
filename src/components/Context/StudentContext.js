import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Student from "../sections/Student";

const StudentContext = createContext();

export function StudentProvider({ children }) {
    const [allStudents, setAllStudents] = useState([]);
    const [singleStudent, setSingleStudent] = useState(null);

    useEffect(() => {
        async function fetchAllStudents() {
            try {
                const response = await axios.get("/api/Student");
                setAllStudents(response.data);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        }

        fetchAllStudents();
    }, []);

    const updateStudent = (id, updatedData) => {
        setSingleStudent((prevSingleStudent) => ({
            ...prevSingleStudent,
            ...updatedData,
        }));
    };

    const addStudent = (newStudent) => {
        setAllStudents((prevStudents) => [...prevStudents, newStudent]);
    };

    const contextValue = {
        allStudents,
        setAllStudents,
        singleStudent,
        setSingleStudent,
        addStudent,
        updateStudent,
    };

    return (
        <StudentContext.Provider value={contextValue}>
            {children}
        </StudentContext.Provider>
    );
}

export function useStudentContext() {
    return useContext(StudentContext);
}
