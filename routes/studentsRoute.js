const express = require("express");
const {
  createStudent,
  getAllStudents,
  getOneStudent,
  updateStudent,
  deleteStudent,
  addCoursesToStudent,
} = require("./../controllers/studentsController");

const router = express.Router();

router.route("/").post(createStudent).get(getAllStudents);

router
  .route("/:id")
  .get(getOneStudent)
  .patch(updateStudent)
  .delete(deleteStudent);

router.patch("/addcourse/:stdId", addCoursesToStudent);

module.exports = router;
