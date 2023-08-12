import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import School from "../sections/School";
const SchoolContext = createContext();
 
export function SchoolProvider({ children }) {
    const [allSchools, setAllSchools] = useState([]);

    useEffect(() => {
        async function fetchAllSchools() {
            const { data } = await axios.get("/api/School");
            setAllSchools(data);
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