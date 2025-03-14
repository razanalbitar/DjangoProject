import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import libraryImage from "../assets/library-illustration.jpg";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="content">
        <h1>Find Your Book</h1>
        <p>
          The largest catalog of online books, a wide range of genres for adults
          and children.
        </p>
        <Link to="/explore" className="btn btn-primary btn-lg">
          Explore Now
        </Link>
      </div>
      <div className="image-container">
        <img src={libraryImage} alt="Library" />
      </div>
    </div>
  );
};

export default HomePage;
