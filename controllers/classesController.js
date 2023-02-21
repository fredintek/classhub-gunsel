const models = require("./../models");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

// create a class
exports.createClass = catchAsync(async (req, res, next) => {
  const { classname } = req.body;

  if (!classname) return next(new AppError("provide a classname", 400));

  const classExists = await models.classes.findOne({
    where: { classname: classname },
  });

  if (classExists) return next(new AppError("class already exists", 400));

  await models.classes.create({
    classname,
  });

  res.status(201).json({
    status: "success",
    message: "Class created successfully",
  });
});

// get all classes
exports.getAllClasses = async (req, res, next) => {
  const classes = await models.classes.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: models.students,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  res.status(200).json({
    status: "success",
    data: classes,
  });
};

// get One class
exports.getOneClass = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const singleClass = await models.classes.findByPk(id, {
    include: [
      {
        model: models.students,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  if (!singleClass) return next(new AppError("class does not exists", 400));

  res.status(200).json({
    status: "success",
    data: singleClass,
  });
});

// update a class
exports.updateClass = catchAsync(async (req, res, next) => {
  const { classname } = req.body;
  const { id } = req.params;
  if (!classname) return next(new AppError("please provide a classname", 400));

  const singleClass = await models.classes.findByPk(id);
  //   console.log(singleClass);
  if (!singleClass) return next(new AppError("class not found", 404));

  // update class here
  await models.classes.update(
    {
      classname,
    },
    { where: { id } }
  );

  res.status(200).json({
    status: "success",
    message: "class updated successfully",
  });
});

// delete a class
exports.deleteClass = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const singleClass = await models.classes.findByPk(id);
  //   console.log(singleClass);
  if (!singleClass) return next(new AppError("class not found", 404));

  await models.classes.destroy({
    where: { id },
  });

  res.status(200).json({
    status: "success",
    message: "class deleted successfully",
  });
});
