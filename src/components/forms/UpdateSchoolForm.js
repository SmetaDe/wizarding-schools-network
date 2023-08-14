import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdateSchool() {
    const [school, setSchool] = useState({});
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const { id } = useParams();

    useEffect(() => {
        async function fetchSchool() {
            try {
                const { data } = await axios.get(`/api/School/${id}`);
                setSchool(data);
                setName(data.name);
                setLocation(data.location);
            } catch (error) {
                console.error("Error fetching school:", error);
            }
        }

        fetchSchool();
    }, [id]);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const { data } = await axios.put(`/api/School/${id}`, {
                name,
                location,
            });

            setName(data.name);
            setLocation(data.location);
        } catch (error) {
            console.error("Error updating school:", error);
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
            /> <br />
            <button type="submit">Submit</button>
        </form>
    );
}
