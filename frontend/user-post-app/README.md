React User Post Media App
======================

This project is a front-end social media application built using React. It allows users to log in, sign up, create posts, and view posts from other users. The application is designed to be responsive and user-friendly, with features like auto-logout and mobile-friendly navigation.

Features
--------

*   **User Authentication**: Users can log in and sign up securely.
*   **Post Management**: Users can create, edit, and delete posts.
*   **Single Post View**: Users can view a specific post in detail.
*   **Mobile-Friendly Navigation**: Optimized navigation menu for mobile devices.
*   **Auto Logout**: User sessions are automatically terminated after a certain period.
*   **Error Handling**: Proper error handling and user notifications using AlertifyJS.

Installation
------------

To run the project on your local machine, follow these steps:

1.  **Clone the Repository**:
    
        git clone https://github.com/dxtaner/Mern-Stack-User-Post-App/edit/main/frontend/user-post-app.git
        cd user-post-app
    
2.  **Install Dependencies**:
    
        npm install
    
3.  **Start the Backend Server**:
    
        npm run server
    
4.  **Start the Application**:
    
        npm start
    
    The application will run on `http://localhost:3000` by default.
    

Usage
-----

### Pages and Routes

*   **Login Page (`/login`)**: Log in with an existing account.
*   **Signup Page (`/signup`)**: Create a new account.
*   **Feed Page (`/posts`)**: View all posts (available only to authenticated users).
*   **Single Post Page (`/posts/post/:postId`)**: View a specific post in detail (available only to authenticated users).
*   **About Page (`/about`)**: Learn more about the application.
*   **Not Found Page (`*`)**: Displays a 404 error page for invalid routes.

### Authentication

*   **Login**: Submit your email and password to log in.
*   **Signup**: Provide your name, email, and password to create a new account.
*   **Logout**: Click the logout button to end your session.

### Navigation

*   **Main Navigation**: Accessible on larger screens.
*   **Mobile Navigation**: Optimized for smaller screens, accessible via a hamburger menu.

Project Structure
-----------------

src/
├── components/          # Reusable components (e.g., Toolbar, Backdrop, Navigation)
├── pages/               # Page components (e.g., Feed, Login, Signup)
├── App.css              # Global styles
├── App.js               # Main application component
├── index.js             # Entry point of the application
  

Technologies
------------

*   **React**: A JavaScript library for building user interfaces.
*   **React Router**: For handling client-side routing.
*   **AlertifyJS**: For displaying user notifications.
*   **CSS**: For styling the application.
*   **Fetch API**: For making HTTP requests to the backend.

Error Handling
--------------

The application includes an `ErrorHandler` component to display errors to the user. Errors are cleared when the user interacts with the application or dismisses the error message.

Auto Logout
-----------

The application automatically logs out users after a specified period of inactivity (1 hour by default). This is handled using `setTimeout` and `localStorage`.

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

Acknowledgments
---------------

*   [React](https://reactjs.org/) for the UI library.
*   [React Router](https://reactrouter.com/) for routing.
*   [AlertifyJS](https://alertifyjs.com/) for notifications.

Contact
-------
