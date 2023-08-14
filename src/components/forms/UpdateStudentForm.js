import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStudentContext } from "../Context/StudentContext";

export default function UpdateStudent() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const { id } = useParams();
    const { updateStudent } = useStudentContext();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const { data } = await axios.put(`/api/Student/${id}`, {
                firstName,
                lastName, 
                email,
            });

            setFirstName("");
            setLastName("");
            setEmail("");
            updateStudent(id, { firstName, lastName, email });
        } catch (error) {
            console.error("Error updating student:", error);
        }
    }
    
    return (
        <form id="student-form" onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name:</label>
            <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            /> <br />
            <label htmlFor="lastName">Last Name:</label>
            <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            /> <br />
            <label htmlFor="email">Email:</label>
            <input 
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            /> <br />
            <button type="submit">Submit</button>
        </form>
    );
}
