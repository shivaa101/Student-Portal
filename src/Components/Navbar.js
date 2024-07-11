import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentData, setStudentData] = useState(null);
  //const [, updateState] = useState(); // Create a dummy state variable to force a re-render
  useEffect(() => {
    const updateStudentData = () => {
      const studentDataString = sessionStorage.getItem('StudentData');
      const parsedStudentData = studentDataString ? JSON.parse(studentDataString) : null;
      setIsLoggedIn(!!parsedStudentData);
      setStudentData(parsedStudentData);
    };
  
    // Update student data on mount
    updateStudentData();
  
    // Subscribe to storage change events to update student data
    window.addEventListener('storage', updateStudentData);
  
    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('storage', updateStudentData);
    };
  }, []); // The empty dependency array ensures this runs only on mount
  
  // Custom CSS to adjust the navbar's height
  const navbarStyle = {
    height: '50px', // Adjust this value to set the desired height
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary" style={navbarStyle}>
      <a className="navbar-brand" href="/">Navbar</a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/">Home, <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">collegess</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">Pricing</a>
          </li>
        </ul>
      </div>
      <div className="ml-auto">
        <div className="nav-item dropdown">
          <div className="dropdown">
            {isLoggedIn ? (
              <div>
                <button className="btn btn-secondary" disabled>
                  Welcome, {studentData?.firstname}
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Login
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="/teacher">Teacher</a>
                  <Link className="dropdown-item" to="/studentlogin">Student</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;