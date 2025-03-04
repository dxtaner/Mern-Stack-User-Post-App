// app.js
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const http = require("http");

const corsMiddleware = require("./middlewares/cors.js");
const fileHelper = require("./utils/fileHelper.js");
const connectToDatabase = require("./config/db.js");
const postRoutes = require("./routes/post.js");
const authRoutes = require("./routes/auth.js");
const keys = require("./keys.js");

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
  multer({
    storage: fileHelper.fileStorage,
    fileFilter: fileHelper.fileFilter,
  }).single("image")
);

const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./graphql/schema.js");
const graphqlResolver = require("./graphql/resolvers.js");

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn: function (error) {
      if (!error.originalError) {
        return error;
      }
      return {
        message: error.message,
        data: error.originalError.data || null,
        status: error.originalError.statusCode || 500,
        locations: error.locations,
        path: error.path,
      };
    },
  })
);

app.use((error, req, res, next) => {
  console.error(error);

  const status = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  const data = error.data || null;

  res.status(status).json({ message: message, data: data });
});

app.use(corsMiddleware);

app.use("/post", postRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  res.status(status).json({ message: error.message, data: error.data });
});

const PORT = process.env.PORT || 3033;

const startServer = async () => {
  try {
    await connectToDatabase(app);

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();

module.exports = app;
