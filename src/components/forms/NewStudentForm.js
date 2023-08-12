import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentContext } from "../Context/StudentContext";

export default function NewStudent() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const { addStudent } = useStudentContext();
    //const navigate = useNavigate();
    
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const { data } = await axios.post("/api/Student", {
                firstName,
                lastName,
                email,
            });
            addStudent(data);

         // navigate("/");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
        <form id="student-form" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            /> <br />
        <label htmlFor="lastName">Last Name:</label>
        <input
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            /> <br />
        <label htmlFor="email">Email:</label>
         <input 
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            /> <br />
            <button type="submit">Go</button>
            </form> 
        </>
        );
}