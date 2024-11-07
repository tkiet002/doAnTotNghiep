const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Question', {
    question_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    question_text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    lesson_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Lessons',
        key: 'lesson_id'
      }
    },
    explaination: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Question',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "question_id" },
        ]
      },
      {
        name: "FK_QUESTION_USER",
        using: "BTREE",
        fields: [
          { name: "created_by" },
        ]
      },
      {
        name: "FK_QUESTION_LESSON",
        using: "BTREE",
        fields: [
          { name: "lesson_id" },
        ]
      },
    ]
  });
};
