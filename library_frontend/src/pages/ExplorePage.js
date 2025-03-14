import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/ExplorePage.css";

const ExplorePage = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBooks();
  }, [searchQuery]);

  const fetchBooks = () => {
    let url = "http://localhost:8000/api/books/";
    if (searchQuery) {
      url += `?search=${searchQuery}`;
    }
    axios
      .get(url)
      .then((response) => setBooks(response.data))
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/books/${id}/`)
      .then(() => fetchBooks())
      .catch((error) => console.error(error));
  };

  return (
    <div className="explore-page">
      <h1 className="text-center mb-4">Explore Books</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title, author, or category"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="book-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <div className="book-image">
              <img
                src={
                  book.image
                    ? `http://localhost:8000${book.image}`
                    : "https://via.placeholder.com/150x225"
                }
                alt={book.title}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150x225";
                }}
              />
            </div>
            <div className="book-details">
              <h3>{book.title}</h3>
              <p>
                {book.author} ({book.publication_year})
              </p>
              <p>{book.category}</p>
              <div className="actions">
                <Link to={`/edit/${book.id}`} className="btn btn-warning">
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(book.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
