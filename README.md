# MERN Stack Integration Assignment

This assignment focuses on building a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that demonstrates seamless integration between front-end and back-end components.

## Assignment Overview

This is a blog application with the following features:
1. RESTful API with Express.js and MongoDB
2. React front-end with component architecture
3. Full CRUD functionality for blog posts
4. User authentication and authorization
5. Advanced features like image uploads and comments

## Project Structure

```
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── context/        # React context providers
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## Getting Started

1. Accepss the GitHub repo
2. Clone your personal repository that was created by GitHub Classroom
3. Follow the setup instructions in the `Week4-Assignment.md` file
4. Complete the tasks outlined in the assignment

## Files Included

- `Week4-Assignment.md`: Detailed assignment instructions
- Starter code for both client and server:
  - Basic project structure
  - Configuration files
  - Sample models and components

## Screenshots of the application
![App Screenshot - Home page](./assets/Screenshot (246).png)
![App Screenshot](./assets/Screenshot (239).png)
![App Screenshot](./assets/Screenshot (242).png)
![App Screenshot](./assets/Screenshot (243).png)

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn
- Git

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

### Project Setup
- Set up a project with a clear directory structure for both client and server
- Configured MongoDB connection using Mongoose
- Set up Express.js server with necessary middleware
- Created a React front-end using Vite and configure proxy for API calls
- Implemented environment variables for configuration management

### Back-End Development
- Designed and implemented a RESTful API for a blog application with the following endpoints:
  - `GET /api/posts`: Get all blog posts
  - `GET /api/posts/:id`: Get a specific blog post
  - `POST /api/posts`: Create a new blog post
  - `PUT /api/posts/:id`: Update an existing blog post
  - `DELETE /api/posts/:id`: Delete a blog post
  - `GET /api/categories`: Get all categories
  - `POST /api/categories`: Create a new category
- Created Mongoose models for `Post` and `Category` with proper relationships
- Implemented input validation using a library like Joi or express-validator
- Added error handling middleware for API routes

### Front-End Development
- Created React components for:
  - Post list view
  - Single post view
  - Create/edit post form
  - Navigation and layout
- Implemented React Router for navigation between different views
- Used React hooks for state management (useState, useEffect, useContext)
- Created a custom hook for API calls

### Integration and Data Flow
- Implemented API service in React to communicate with the back-end
- Set up state management for posts and categories
- Created forms with proper validation for creating and editing posts
- Implemented optimistic UI updates for better user experience
- Handled loading and error states for API calls

### Advanced Features
- Added user authentication (registration, login, protected routes)
- Implemented image uploads for blog post featured images
- Added pagination for the post list
- Implemented searching and filtering functionality
- Added comments feature for blog posts

## 🧪 Outcome
- A fully functional MERN stack blog application
- Proper integration between MongoDB, Express.js, React.js, and Node.js
- Clean code organization with separation of concerns
- Responsive UI with good user experience
- Implementation of at least one advanced feature

## 🛠️ Setup
1. Make sure you have Node.js (v18+) and MongoDB installed
2. Clone the starter code repository
3. Install server dependencies:
   ```
   cd server
   npm install
   ```
4. Install client dependencies:
   ```
   cd client
   npm install
   ```
5. Set up environment variables as described in the `.env.example` files
6. Start the development servers:
   ```
   # In the server directory
   npm run dev
   
   # In the client directory
   npm run dev
   ```

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/) 