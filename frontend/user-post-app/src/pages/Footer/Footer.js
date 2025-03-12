import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div>
        <p style={textStyle}>&copy; 2025 User-Post-App</p>
      </div>
      <div>
        <p style={textStyle}>
          Developed by{" "}
          <a
            href="https://github.com/dxtaner"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}>
            dxtaner
          </a>
        </p>
      </div>
    </footer>
  );
};

// Define styles as objects
const footerStyle = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "10px",
  textAlign: "center",
};

const textStyle = {
  margin: "0",
};

const linkStyle = {
  color: "#61dafb",
  textDecoration: "none",
};

export default Footer;
