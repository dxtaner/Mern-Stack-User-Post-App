const jwt = require("jsonwebtoken");
const { TOKEN_SECRET_KEY } = require("../keys");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("Not authorized");
    error.statusCode = 401;
    return next(error);
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, TOKEN_SECRET_KEY);
  } catch (err) {
    err.statusCode = 500;
    return next(err);
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    return next(error);
  }

  req.userId = decodedToken.userId;
  next();
};
