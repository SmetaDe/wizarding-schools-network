import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSchoolContext } from "../Context/SchoolContext";
import School from "./School";
import NewSchool from "../forms/NewSchoolForm";

export default function AllSchools() {
    const {allSchools, setAllSchools} = useSchoolContext();

const handleAddSchool = (newSchool) => {
    setAllSchools((prevSchools) => [...prevSchools, newSchool]);
};

const handleDeleteSchool = async (id) => {
    try {
        await axios.delete(`/api/School/${id}`);

        console.log(1);
        setAllSchools((prevSchools) => { 
            console.log(prevSchools)
            return prevSchools.filter(school => school.id !== id );
        });
    }   catch (error) {
        console.error("could not delete student:",error);
    }
};

    return (
        <>
        <h1>All Wizarding Schools</h1>
        <ul id = "main">
            {allSchools.map((school) => (
                <li key={school.id}> 
                    <Link to={`/Wizarding-schools/${school.id}`}>{school.name}</Link> <br />
                    <button onClick={() => handleDeleteSchool(school.id)}>Delete School</button>
                </li>
            ))}
        </ul>
        <h2>Add Another Wizarding School</h2>
        <NewSchool onAddSchool={handleAddSchool}/>
        </>
    );
}