import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import School from "../sections/School";

const SchoolContext = createContext();

export function SchoolProvider({ children }) {
    const [allSchools, setAllSchools] = useState([]);

    useEffect(() => {
        async function fetchAllSchools() {
            try {
                const response = await axios.get("/api/School");
                setAllSchools(response.data);
            } catch (error) {
                console.error("Error fetching schools:", error);
            }
        }

        fetchAllSchools();
    }, []);

    const contextValue = {
        allSchools,
        setAllSchools,
    };

    return (
        <SchoolContext.Provider value={contextValue}>
            {children}
        </SchoolContext.Provider>
    );
}

export function useSchoolContext() {
    return useContext(SchoolContext);
}