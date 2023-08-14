import React, { useState } from "react";
import axios from "axios";
import { useStudentContext } from "../Context/StudentContext";

export default function NewStudent() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const { addStudent } = useStudentContext();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const { data } = await axios.post("/api/Student", {
                firstName,
                lastName,
                email,
            });
            addStudent(data);
        } catch (error) {
            console.error("Error creating student:", error);
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
            <button type="submit">Create Student</button>
        </form>
    );
}
