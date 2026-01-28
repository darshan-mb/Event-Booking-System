Event Booking System

A full-stack event booking application that allows users to browse upcoming events, book and cancel tickets, and receive email confirmations. Built using React.js, Node.js, Express.js, MongoDB, and Nodemailer with RESTful APIs.

Tech Stack

React.js

Node.js

Express.js

MongoDB

Mongoose

Nodemailer

React Router

Project Duration

5 Days

Key Features

Browse upcoming events and view detailed event information

Book tickets with proper ticket reservation logic

Cancel bookings with automatic email notification

Receive confirmation emails on successful booking

Store events and booking data securely in MongoDB

Client-side navigation using React Router

Functional Requirements

Allow users to view a list of upcoming events

Enable event booking and ticket reservation

Handle booking cancellations correctly

Send email notifications for booking and cancellation

Maintain event and booking records in MongoDB

Tools and Resources

Frontend: React.js for UI and booking forms

Backend: Node.js and Express.js for REST APIs

Database: MongoDB with Mongoose ODM

Email Service: Nodemailer (or SendGrid)

Routing: React Router for navigation

Setup Instructions
Prerequisites

Node.js installed

MongoDB running locally or cloud instance

Git installed

Backend Setup
cd backend
npm install
npm start
Frontend Setup
cd frontend
npm install
npm start
Environment Variables

Create a .env file inside the backend folder and configure the following:

MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password_or_app_password

⚠️ Do not push .env files to GitHub. Make sure it is included in .gitignore.

API Overview

POST /api/events – Create a new event

GET /api/events – Fetch all upcoming events

POST /api/bookings – Book tickets for an event

DELETE /api/bookings/:id – Cancel a booking

Deliverables

Fully functional event booking web application

Email notifications for booking and cancellation

Sample environment variable configuration

Setup guide and basic API documentation

Future Enhancements

User authentication and authorization

Admin dashboard for event management

Payment gateway integration

Event search and filtering

Author

Darshan

License

This project is for educational purposes only.
