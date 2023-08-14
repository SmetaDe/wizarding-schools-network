import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSchoolContext } from "../Context/SchoolContext";
import NewSchool from "../forms/NewSchoolForm";

export default function AllSchools() {
    const { allSchools, setAllSchools } = useSchoolContext();

    const handleAddSchool = (newSchool) => {
        setAllSchools((prevSchools) => [...prevSchools, newSchool]);
    };

    const handleDeleteSchool = async (id) => {
        try {
            await axios.delete(`/api/School/${id}`);
            setAllSchools((prevSchools) => prevSchools.filter(school => school.id !== id));
        } catch (error) {
            console.error("Could not delete school:", error);
        }
    };

    return (
        <>
            <h1>All Wizarding Schools</h1>
            <ul id="main">
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
