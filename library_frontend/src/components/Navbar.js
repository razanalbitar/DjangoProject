import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className={`navbar ${isHomePage ? "homepage-navbar" : ""}`}>
      {isHomePage ? (
        <div className="logo center-logo">LibraryHub</div>
      ) : (
        <>
          <div className="logo">LibraryHub</div>
          <nav className="nav-links">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/add" className="nav-link">
              Add Book
            </NavLink>
          </nav>
        </>
      )}
    </header>
  );
};

export default Navbar;
