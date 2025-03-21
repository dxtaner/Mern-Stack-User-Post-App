
User Post Media App
===================

A full-stack social media app allowing users to log in, sign up, and create, view, and manage posts. Built with Node.js, Express, MongoDB/PostgreSQL, and React.

Backend
-------

### Features

*   **Authentication:** User login, signup, and JWT-based authentication.
*   **Post Management:** Create, read, update, and delete posts.
*   **Error Handling:** Proper error responses.
*   **Database:** MongoDB/PostgreSQL for storing users and posts.

### Installation

1.  Clone the repository:
    
        git clone https://github.com/dxtaner/Mern-Stack-User-Post-App/new/main/backend-graphql
        cd backend-graphql
    
2.  Install dependencies:
    
        npm install
    
3.  Set up `.env` with:
    
        PORT=3033
        MONGODB_URI=mongodb://localhost:27017/
        JWT_SECRET=your_jwt_secret_key
    
4.  Start the server:
    
        npm start
    

### API Endpoints

*   **POST** `/auth/login`: Login
*   **POST** `/auth/signup`: Signup
*   **GET** `/posts`: Fetch all posts
*   **POST** `/posts`: Create post
*   **GET** `/posts/:postId`: Fetch post by ID
*   **PUT** `/posts/:postId`: Update post by ID
*   **DELETE** `/posts/:postId`: Delete post by ID

Frontend
--------

### Features

*   **Authentication:** Login and signup.
*   **Post Management:** Create, edit, and delete posts.
*   **Mobile-Friendly Navigation:** Optimized for mobile devices.
*   **Auto Logout:** Automatic logout after inactivity.

### Installation

1.  Clone the repository:
    
        git clone https://github.com/dxtaner/Mern-Stack-User-Post-App/edit/main/frontend/user-post-app.git
        cd user-post-app
    
2.  Install dependencies:
    
        npm install
    
3.  Start the backend:
    
        npm run server
    
4.  Start the app:
    
        npm start
    

### Pages and Routes

*   **Login** (`/login`)
*   **Signup** (`/signup`)
*   **Feed** (`/posts`)
*   **Single Post** (`/posts/post/:postId`)

Contributing
------------

1.  Fork the repository.
2.  Create a new branch for your feature.
3.  Make changes and commit them.
4.  Push and open a Pull Request.

License
-------

This project is licensed under the MIT License.
