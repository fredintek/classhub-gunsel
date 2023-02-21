"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.students, {
        through: "studentscourses",
        foreignKey: "courseId",
        as: "students",
      });
    }
  }
  courses.init(
    {
      coursename: DataTypes.STRING,
      updatedAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "courses",
    }
  );
  return courses;
};
