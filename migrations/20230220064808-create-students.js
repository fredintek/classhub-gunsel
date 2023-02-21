"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "students",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        firstname: {
          type: Sequelize.STRING,
        },
        lastname: {
          type: Sequelize.STRING,
        },
        age: {
          type: Sequelize.INTEGER,
        },
        class_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "classes",
            key: "id",
          },
          onDelete: "CASCADE",
        },
      },
      { timestamps: true }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("students");
  },
};
