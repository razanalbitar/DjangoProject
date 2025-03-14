# DjangoProject

# Library Management System

This is a full-stack library management system built with **Django** (backend), **React** (frontend), and **PostgreSQL** (database). It allows users to manage books, including adding, editing, deleting, and searching for books.

## Features

- **Backend**: Django REST API for managing books.
- **Frontend**: React-based user interface for interacting with the library system.
- **Database**: PostgreSQL for storing book data.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.x** (for Django backend)
- **Node.js** (for React frontend)
- **PostgreSQL** (for the database)
- **pip** (Python package manager)
- **npm** (Node.js package manager)

---

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/razanalbitar/DjangoProject.git
cd DjangoProject
```

Backend Setup:

1. Navigate to the backend directory using `cd library_backend`.
2. Create a virtual environment with `python -m venv venv`.
3. Activate the virtual environment using `source venv/bin/activate` on macOS/Linux or `venv\Scripts\activate` on Windows.
4. Install dependencies by running `pip install -r requirements.txt`.
5. Open the `settings.py` file in your Django project and configure the database settings under the `DATABASES` section. Set the `NAME`, `USER`, `PASSWORD`, `HOST`, and `PORT` for your PostgreSQL database.
6. Run migrations using `python manage.py migrate`.
7. Start the backend server with `python manage.py runserver`.

Frontend Setup:

1. Navigate to the frontend directory using `cd ../library_frontend`.
2. Install dependencies by running `npm install`.
3. Start the frontend server using `npm start`.
