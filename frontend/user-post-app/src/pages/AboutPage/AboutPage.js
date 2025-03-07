// AboutPage.js

import React from "react";

const AboutPage = () => {
  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>About User-Post-App</h2>
      <p style={paragraphStyle}>
        User-Post-App is a web application designed to provide users with a
        platform for sharing and exploring posts. Connect with other users,
        create your posts, and engage with a vibrant community.
      </p>
      <h3 style={subHeaderStyle}>Key Features</h3>
      <ul style={listStyle}>
        <li>
          User Authentication: Securely register and log in to your account.
        </li>
        <li>
          Post Creation: Share your thoughts and experiences through posts.
        </li>
        <li>
          Post Interaction: Update, delete, and view posts from other users.
        </li>
      </ul>
      <h3 style={subHeaderStyle}>Developed by</h3>
      <p style={paragraphStyle}>
        User-Post-App is developed by{" "}
        <a
          href="https://github.com/dxtaner"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}>
          dxtaner
        </a>
      </p>
      <h3 style={subHeaderStyle}>Version</h3>
      <p style={paragraphStyle}>1.0.0</p>
      <h3 style={subHeaderStyle}>Release Date</h3>
      <p style={paragraphStyle}>2025</p>
    </div>
  );
};

const containerStyle = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "20px",
};

const headerStyle = {
  color: "#333",
  fontSize: "2em",
};

const subHeaderStyle = {
  color: "#555",
  fontSize: "1.5em",
  marginTop: "20px",
};

const paragraphStyle = {
  lineHeight: "1.6",
};

const listStyle = {
  paddingLeft: "20px",
};

const linkStyle = {
  color: "#007BFF",
  textDecoration: "none",
};

export default AboutPage;
