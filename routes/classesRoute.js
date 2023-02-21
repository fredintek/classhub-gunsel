const express = require("express");
const {
  getAllClasses,
  createClass,
  updateClass,
  deleteClass,
  getOneClass,
} = require("./../controllers/classesController");

const router = express.Router();

router.route("/").get(getAllClasses).post(createClass);

router.route("/:id").get(getOneClass).patch(updateClass).delete(deleteClass);

module.exports = router;
