import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
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
            } catch (err) {
              console.error(err);
            }
        }

        fetchSchool();
        }, [id]);

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(name, location);

        try {
            const { data } = await axios.put(`/api/School/${id}`, {
                name,
                location, 
            });

            console.log(data);
            setName(data.name);
            setLocation(data.location);
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
            /> <br />
            <button type="submit">Submit</button>
            </form> 
        </>
        );
    }