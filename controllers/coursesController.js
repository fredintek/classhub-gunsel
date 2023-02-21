const models = require("./../models");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

// create a course
exports.createCourse = catchAsync(async (req, res, next) => {
  const { coursename } = req.body;

  console.log(coursename);

  if (!coursename)
    return next(new AppError("please provide a coursename", 400));

  const singleCourse = await models.courses.findOne({
    where: {
      coursename,
    },
  });

  if (singleCourse) return next(new AppError("course already exists", 400));

  await models.courses.create({
    coursename,
  });

  res.status(201).json({
    status: "success",
    message: "course created successfully",
  });
});

// get all courses
exports.getAllCourses = catchAsync(async (req, res, next) => {
  const courses = await models.courses.findAll({
    order: [["createdAt", "DESC"]],
    include: ["students"],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  res.status(200).json({
    status: "success",
    data: courses,
  });
});

// get one course
exports.getOneCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const singleCourse = await models.courses.findByPk(id, {
    include: ["students"],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  if (!singleCourse) return next(new AppError("course not found", 404));

  res.status(200).json({
    status: "success",
    data: singleCourse,
  });
});

//update a course
exports.updateCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { coursename } = req.body;

  const singleCourse = await models.courses.findByPk(id);

  if (!singleCourse) return next(new AppError("course not found", 404));

  // update course here
  await models.courses.update(
    {
      coursename,
    },
    { where: { id } }
  );

  res.status(200).json({
    status: "success",
    message: "course updated successfully",
  });
});

// delete a course
exports.deleteCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const singleCourse = await models.courses.findByPk(id);

  if (!singleCourse) return next(new AppError("course not found", 404));

  // update course here
  await models.courses.destroy({ where: { id } });

  res.status(200).json({
    status: "success",
    message: "course deleted successfully",
  });
});

// add students to a course
exports.addStudentsToCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;

  const { studentsid } = req.body;
  const singleCourse = await models.courses.findByPk(courseId);

  if (!singleCourse) return next(new AppError("course not found", 400));

  if (!studentsid) return next(new AppError("please provide students", 400));

  await singleCourse.setStudents([]);

  for (let i = 0; i < studentsid.length; i++) {
    const singleStudent = await models.students.findByPk(studentsid[i]);
    if (!singleStudent) return next(new AppError("invalid studentsid", 400));
    await singleCourse.addStudents(singleStudent);
  }

  res.status(200).json({
    status: "success",
    message: "added students successfully",
  });
});
