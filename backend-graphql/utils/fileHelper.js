const multer = require("multer");
const crypto = require("crypto");

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    crypto.randomBytes(10, (error, buffer) => {
      if (error) {
        return callback(error, null);
      }
      const parts = file.originalname.split(".");
      const extension = parts[parts.length - 1];
      const filename = buffer.toString("hex") + "." + extension;
      callback(null, filename);
    });
  },
});

const fileFilter = (req, file, callback) => {
  const allowedExtensions = ["image/jpg", "image/jpeg", "image/png"];
  if (allowedExtensions.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

module.exports = {
  fileStorage,
  fileFilter,
};
