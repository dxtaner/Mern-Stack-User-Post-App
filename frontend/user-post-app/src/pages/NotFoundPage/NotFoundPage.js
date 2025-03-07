import React from "react";

const NotFoundPage = () => {
  const notFoundContainerStyle = {
    textAlign: "center",
    margin: "50px",
    padding: "20px",
    border: "2px solid #ff7f50", // Coral color for the border
    borderRadius: "8px",
    backgroundColor: "#fff", // White background
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle box shadow for depth
  };

  const notFoundTitleStyle = {
    color: "#ff7f50", // Coral color for the title
    fontSize: "2rem",
    marginBottom: "10px",
  };

  const notFoundMessageStyle = {
    color: "#555",
    fontSize: "1.2rem",
    margin: "0",
  };

  return (
    <div style={notFoundContainerStyle}>
      <h2 style={notFoundTitleStyle}>404 - Not Found</h2>
      <p style={notFoundMessageStyle}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFoundPage;
