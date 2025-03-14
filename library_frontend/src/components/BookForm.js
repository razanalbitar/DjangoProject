import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/BookForm.css";

const BookForm = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publication_year: "",
    category: "",
    image: null,
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/api/books/${id}/`)
        .then((response) => setBook(response.data))
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("publication_year", book.publication_year);
    formData.append("category", book.category);

    // Only append the image if a new file is selected
    if (book.image instanceof File) {
      formData.append("image", book.image);
    }

    // Log FormData to check if all fields are present
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    if (id) {
      axios
        .put(`http://localhost:8000/api/books/${id}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => navigate("/explore"))
        .catch((error) => {
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
        });
    } else {
      axios
        .post("http://localhost:8000/api/books/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => navigate("/explore"))
        .catch((error) => {
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
        });
    }
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedExtensions = [
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".bmp",
        ".webp",
      ];
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(`.${fileExtension}`)) {
        alert(
          "Invalid file type. Please upload an image with a valid extension (png, jpg, jpeg, gif, bmp, webp)."
        );
        return;
      }

      const shortenedFileName = file.name.substring(0, 100);
      const shortenedFile = new File([file], shortenedFileName, {
        type: file.type,
      });

      setBook({ ...book, image: shortenedFile });
    }
  };
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mt-4">
      <span className="back-button" onClick={goBack}>
        ←
      </span>

      <h1 className="text-center mb-4">{id ? "Edit Book" : "Add Book"}</h1>
      <form onSubmit={handleSubmit} className="card p-4 book-form">
        <div className="form-group mb-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Author</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Publication Year</label>
          <input
            type="number"
            className="form-control"
            name="publication_year"
            value={book.publication_year}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={book.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Image</label>
          <input
            type="file"
            className="form-control"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        <div className="btn-container">
          <button type="submit" className="btn btn-primary">
            {id ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
