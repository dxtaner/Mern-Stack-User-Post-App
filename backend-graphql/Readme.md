Backend for User Post Media App
==================================

This is the backend component of the React Social Media App. It provides RESTful API endpoints for user authentication, post management, and other functionalities required by the frontend application.

Features
--------

*   **User Authentication**: Handles user login, signup, and token-based authentication.
*   **Post Management**: Allows users to create, read, update, and delete posts.
*   **Error Handling**: Proper error responses for invalid requests.
*   **Database Integration**: Uses a database (e.g., MongoDB, PostgreSQL) to store user and post data.
*   **Security**: Implements password hashing and token-based authentication.

Technologies
------------

*   **Node.js**: Runtime environment for the backend.
*   **Express.js**: Framework for building RESTful APIs.
*   **MongoDB/PostgreSQL**: Database for storing user and post data.
*   **JWT (JSON Web Tokens)**: For user authentication and session management.
*   **Bcrypt**: For password hashing.
*   **CORS**: To handle cross-origin requests from the frontend.

Installation
------------

To set up the backend on your local machine, follow these steps:

1.  **Clone the Repository**:
    
        git clone https://github.com/dxtaner/Mern-Stack-User-Post-App/new/main/backend-graphql
        cd backend-graphql
    
2.  **Install Dependencies**:
    
        npm install
    
3.  **Set Up Environment Variables**:
    
    Create a `.env` file in the root directory and add the following variables:
    
        PORT=3033
        MONGODB_URI=mongodb://localhost:27017/
        JWT_SECRET=your_jwt_secret_key
    
4.  **Start the Server**:
    
        npm start
    
    The server will run on `http://localhost:3033` by default.
    

API Endpoints
-------------

### Authentication

*   **POST `/auth/login`**: Log in a user.
    
    **Request Body**:
    
        {
          "email": "user@example.com",
          "password": "password123"
        }
    
    **Response**:
    
        {
          "token": "jwt_token",
          "userId": "user_id"
        }
    
*   **POST `/auth/signup`**: Register a new user.
    
    **Request Body**:
    
        {
          "name": "John Doe",
          "email": "user@example.com",
          "password": "password123"
        }
    
    **Response**:
    
        {
          "message": "User created successfully!"
        }
    

### Posts

*   **GET `/posts`**: Fetch all posts.
    
    **Response**:
    
        [
          {
            "id": "post_id",
            "title": "Post Title",
            "content": "Post Content",
            "creator": "user_id",
            "createdAt": "timestamp"
          }
        ]
    
*   **POST `/posts`**: Create a new post.
    
    **Request Body**:
    
        {
          "title": "Post Title",
          "content": "Post Content"
        }
    
    **Response**:
    
        {
          "message": "Post created successfully!",
          "post": {
            "id": "post_id",
            "title": "Post Title",
            "content": "Post Content",
            "creator": "user_id",
            "createdAt": "timestamp"
          }
        }
    
*   **GET `/posts/:postId`**: Fetch a single post by ID.
    
    **Response**:
    
        {
          "id": "post_id",
          "title": "Post Title",
          "content": "Post Content",
          "creator": "user_id",
          "createdAt": "timestamp"
        }
    
*   **PUT `/posts/:postId`**: Update a post by ID.
    
    **Request Body**:
    
        {
          "title": "Updated Title",
          "content": "Updated Content"
        }
    
    **Response**:
    
        {
          "message": "Post updated successfully!"
        }
    
*   **DELETE `/posts/:postId`**: Delete a post by ID.
    
    **Response**:
    
        {
          "message": "Post deleted successfully!"
        }
    

Database Schema
---------------

### Users

    {
      "name": "String",
      "email": "String",
      "password": "String",
      "posts": ["Array of Post IDs"]
    }

### Posts

    {
      "title": "String",
      "content": "String",
      "creator": "User ID",
      "createdAt": "Date"
    }

Error Handling
--------------

The backend returns appropriate error responses for invalid requests. Examples include:

*   **400 Bad Request**: Invalid input data.
*   **401 Unauthorized**: Missing or invalid authentication token.
*   **404 Not Found**: Resource not found.
*   **500 Internal Server Error**: Server-side errors.

Contributing
------------

If you'd like to contribute to this project, follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bugfix.
3.  Make your changes and commit them.
4.  Push your changes to your fork.
5.  Open a Pull Request.

For major changes, please open an issue first to discuss the proposed changes.

License
-------

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

Contact
-------
