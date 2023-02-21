const express = require("express");
const app = express();
const cors = require("cors");

const errHandler = require("./controllers/errHandler");
const AppError = require("./utils/appError");
const ClassRoutes = require("./routes/classesRoute");
const StudentsRoute = require("./routes/studentsRoute");
const CoursesRoute = require("./routes/coursesRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/class", ClassRoutes);
app.use("/api/v1/course", CoursesRoute);
app.use("/api/v1/student", StudentsRoute);

app.use("*", (req, res, next) => {
  return next(new AppError("invalid url", 404));
});

// handle all errors
app.use(errHandler);

module.exports = app;
