import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <h1>Welcome to the Wizarding Schools Network!</h1>
      <Link to="/Wizarding-schools">View All Wizarding Schools</Link>
      <br />
      <Link to="/Students">View All Students</Link>
    </div>
  );
};

export default Main;
