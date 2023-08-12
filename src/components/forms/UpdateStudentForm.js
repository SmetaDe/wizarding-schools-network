import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStudentContext } from "../Context/StudentContext";

export default function UpdateStudent() {
    const [student, setStudent] = useState({});
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const { id } = useParams();
    const { updateStudent } = useStudentContext();

   /* useEffect(() => {
        async function fetchStudent() {
            try {
                const { data } = await axios.get(`/api/Student/${id}`);
                setStudent(data);
            } catch (err) {
              console.error(err);
            }
        } 

        fetchStudent();
        }, [id]); */

    

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(firstName, lastName, email);

        try {
            const { data } = await axios.put(`/api/Student/${id}`, {
                firstName,
                lastName, 
                email,
            });

            console.log(data);
            setFirstName("");
            setLastName("");
            setEmail("");
            updateStudent(id, {firstName,lastName,email})
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
            <button type="submit">Submit</button>
            </form> 
        </>
        );
    }