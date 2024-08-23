# MERN User Auth

## Overview

This project implements a full-fledged authentication system using the MERN stack. It includes user sign-up, sign-in, email verification via OTP, and password reset functionality. The project leverages modern technologies on both the frontend and backend to create a secure and scalable authentication system.

## Features

- **User Registration**: Users can create an account by providing an email and password.
- **Email Verification**: After registration, users receive an OTP (One-Time Password) via email to verify their account.
- **User Login**: Registered users can log in using their credentials.
- **Password Reset**: Users can reset their password if they forget it, with a verification step via email.
- **Session Management**: User sessions are managed using Redux Persist.

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **Redux**: For state management.
- **Redux Persist**: To persist the Redux state in local storage.
- **Next UI**: For UI components and styling.

### Backend
- **Express.js**: A web application framework for Node.js to handle server-side logic.
- **MongoDB**: A NoSQL database for storing user data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Nodemailer**: To send OTP emails for verification and password reset.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abhaychauhan8802/mern-user-auth.git
   cd mern-user-auth

2. Install the dependencies for both frontend and backend:
    ```bash
       # Frontend
       cd client
       npm install
    
       # Backend
       cd server
       npm install

3. Create a .env file in the server directory and add the following environment variables:
    ```bash
    MONGO_URL = your_mongodb_connection_string
    JWT_SECRET = your_jwt_secret
    AUTH_USER = your_email_address
    AUTH_PASS = your_email_password
    CLIENT_URL = "http://localhost:5173"

4. Run the development servers:
    ```bash
    # Backend
    cd server
    npm run dev

    # Frontend
    cd client
    npm run dev


### Folder Structure

  ```bash
      mern-auth-auth/
      ├── client/               # React frontend
      │   ├── src/
      │   │   ├── components/   # React components
      │   │   ├── pages/        # Pages
      │   │   ├── redux/        # Redux store and slices
      │   │   └── ...           # Other frontend files
      │   ├── public/           # Public assets
      │   └── ...               # Configuration files
      ├── server/               # Express backend
      │   ├── controllers/      # Route controllers
      │   ├── models/           # Mongoose models
      │   ├── routes/           # Express routes
      │   ├── utils/            # Utility functions (e.g., OTP generation, email sending)
      │   └── ...               # Other backend files
      └── README.md             # Project documentation
     
