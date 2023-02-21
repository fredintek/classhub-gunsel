"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.classes, {
        foreignKey: "id",
      });

      this.belongsToMany(models.courses, {
        through: "studentscourses",
        foreignKey: "studentId",
        as: "courses",
      });
    }
  }
  students.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      age: DataTypes.NUMBER,
      class_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "classes",
          key: "id",
        },
      },
      updatedAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "students",
    }
  );
  return students;
};
