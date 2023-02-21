"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("studentscourses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      studentId: {
        type: Sequelize.STRING,
      },
      courseId: {
        type: Sequelize.STRING,
      },
    },{timestamps: true});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("studentscourses");
  },
};
