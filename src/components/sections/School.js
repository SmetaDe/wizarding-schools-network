import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStudentContext } from "../Context/StudentContext";
import { Link } from "react-router-dom";
import UpdateSchool from "../forms/UpdateSchoolForm";

export default function School() {
    const [school, setSchool] = useState(null);
    const { id } = useParams();
    const { allStudents } = useStudentContext();
    const schoolId = parseInt(id);
    const schoolStudents = allStudents.filter(student => student.SchoolId === schoolId);

    useEffect(() => {
        async function fetchSchoolDetails() {
            try {
                const { data } = await axios.get(`/api/School/${id}`);
                setSchool(data);
            } catch (error) {
                console.error("Error fetching school details:", error);
            }
        }

        fetchSchoolDetails();
    }, [id]);

    async function handleUpdateSchool(updatedSchoolData) {
        try {
            const { data } = await axios.put(`api/School/${id}`, updatedSchoolData);
            setSchool(data);
        } catch (error) {
            console.error("Error updating school:", error);
        }
    }

    if (!school) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{school.name}</h2>
            <p> Location: {school.location} </p>
            <p> About: {school.description} </p>
            <img src={school.imageURL} alt={`Logo of ${school.name}`} />
            <h2>Currently Enrolled Students</h2>
            <ul>
                {schoolStudents.map(student => (
                    <Link to={`/Students/${student.id}`} key={student.id}>
                        <li>{student.firstName}</li>
                    </Link>
                ))}
            </ul>
            <div>
                <h2>Update School</h2>
                <UpdateSchool onUpdateSchool={handleUpdateSchool} school={school} />
            </div>
        </div>
    );
}
