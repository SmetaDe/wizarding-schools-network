import React, { useState } from "react";
import axios from "axios";
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
        } catch (error) {
            console.error("Error creating school:", error);
        }
    }

    return (
        <form id="school-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            /> <br />
            <label htmlFor="location">Location:</label>
            <input
                type="text"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <button type="submit">Create School</button>
        </form>
    );
}
