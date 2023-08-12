import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewSchool() {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const { data } = await axios.post("/api/School", {
                name,
                location,
            });

        navigate("/");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
        <form id="school-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            /> <br />
        <label htmlFor="location">Location:</label>
        <input
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            />
            <button type="submit">Go</button>
            </form> 
        </>
        );
}