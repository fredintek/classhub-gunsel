const express = require("express");
const {
  createCourse,
  getAllCourses,
  getOneCourse,
  updateCourse,
  deleteCourse,
  addStudentsToCourse,
} = require("./../controllers/coursesController");

const router = express.Router();

router.route("/").post(createCourse).get(getAllCourses);

router.route("/:id").get(getOneCourse).patch(updateCourse).delete(deleteCourse);

router.patch("/addstudent/:courseId", addStudentsToCourse);

module.exports = router;
