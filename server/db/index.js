"use strict";
const { db, Sequelize } = require("./db");

// Require your models and make your associations

const School = db.define("School", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageURL: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
});

const Student = db.define("Student", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Please enter a valid email address',
      },
    },
  },
  imageURL: {
    type: Sequelize.STRING,
  },
  gpa: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      isFloat: {
        args: [0.0, 4.0],
        msg: 'GPA must be between 0.0 and 4.0',
      },
    },
  },
});

Student.belongsTo(School);
School.hasMany(Student);

module.exports = {
  db,
  School,
  Student,
};
