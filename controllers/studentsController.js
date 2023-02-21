const e = require("express");
const models = require("./../models");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

// get all students
exports.getAllStudents = catchAsync(async (req, res, next) => {
  const allStudents = await models.students.findAll({
    order: [["createdAt", "DESC"]],
    include: ["courses"],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  res.status(200).json({
    status: "success",
    data: allStudents,
  });
});

//get one student
exports.getOneStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const singleStudent = await models.students.findByPk(id, {
    include: ["courses"],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  if (!singleStudent) return next(new AppError("student not found", 404));

  res.status(200).json({
    status: "success",
    data: singleStudent,
  });
});

//create a student
exports.createStudent = catchAsync(async (req, res, next) => {
  const { firstname, lastname, age, classname, coursename } = req.body;

  // check if fields exists
  if (!firstname || !lastname || !age || !classname || !coursename)
    return next(new AppError("please provide values for all fields", 400));

  // check if this student exists in db
  const singleStudent = await models.students.findOne({
    where: { firstname, lastname },
  });

  if (singleStudent) return next(new AppError("student already exists", 400));

  // check if class is valid and extract class-ID
  const singleClass = await models.classes.findOne({
    where: { classname },
  });

  if (!singleClass) return next(new AppError("invalid classname", 400));

  const classId = singleClass.dataValues.id;

  const stdObj = {
    firstname,
    lastname,
    age,
    class_id: classId,
  };

  // create the student
  const student = await models.students.create(stdObj);

  // check coursenames array and return corresponding courses
  for (let i = 0; i < coursename.length; i++) {
    const courseCheck = await models.courses.findByPk(coursename[i]);
    if (!courseCheck) return next(new AppError("invalid courses", 400));
    await student.addCourses(courseCheck);
  }

  res.status(201).json({
    status: "success",
    message: "student created successfully",
  });
});

//update a student
exports.updateStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { firstname, lastname, age, classname, coursename } = req.body;
  let classId;

  const singleStudent = await models.students.findByPk(id);
  // console.log(singleStudent);

  if (!singleStudent) return next(new AppError("student not found", 400));

  // find and extract the classId
  if (classname) {
    const singleClass = await models.classes.findOne({ where: { classname } });
    // console.log(singleClass);

    if (!singleClass) return next(new AppError("class not found", 400));

    classId = singleClass.dataValues.id;
  } else {
    classId = singleStudent.dataValues.class_id;
  }

  // now update the student courses with the new courses data
  let newCourses = [];
  for (let i = 0; i < coursename.length; i++) {
    const singleCourse = await models.courses.findByPk(coursename[i]);
    if (!singleCourse) return next(new AppError("invalid coursename", 400));
    newCourses.push(singleCourse);
  }

  // construct the update student object
  const updateStdObj = {
    firstname: firstname || singleStudent.dataValues.firstname,
    lastname: lastname || singleStudent.dataValues.lastname,
    age: age || singleStudent.dataValues.age,
    class_id: classId,
  };

  // now update student
  await models.students.update(updateStdObj, { where: { id } });

  await singleStudent.setCourses([]);

  for (let i = 0; i < newCourses.length; i++) {
    await singleStudent.addCourses(newCourses[i]);
  }

  res.status(200).json({
    status: "success",
    message: "student updated successfully",
  });
});

// delete a student
exports.deleteStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const singleStudent = await models.students.findByPk(id);
  if (!singleStudent) return next(new AppError("student not found", 400));

  await models.students.destroy({ where: { id } });

  res.status(200).json({
    status: "success",
    message: "student deleted successfully",
  });
});

// add a course to a student
exports.addCoursesToStudent = catchAsync(async (req, res, next) => {
  const { stdId } = req.params;
  const { coursename } = req.body;
  // console.log(coursename)

  // console.log(stdId)

  if (!coursename)
    return next(new AppError("please provide a coursename", 400));

  const singleStudent = await models.students.findByPk(stdId);

  if (!singleStudent) return next(new AppError("student not found", 400));

  await singleStudent.setCourses([]);

  for (let i = 0; i < coursename.length; i++) {
    const singleCourse = await models.courses.findByPk(coursename[i]);
    if (!singleCourse) return next(new AppError("invalid coursename", 400));
    await singleStudent.addCourses(singleCourse);
  }

  res.status(200).json({
    status: "success",
    message: "added courses successfully",
  });
});
