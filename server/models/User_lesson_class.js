const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User_lesson_class', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    lesson_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Lessons',
        key: 'lesson_id'
      }
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Class',
        key: 'class_id'
      }
    }
  }, {
    sequelize,
    tableName: 'User_lesson_class',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "lesson_id" },
          { name: "class_id" },
        ]
      },
      {
        name: "FK_USER_LESSON_CLASS_LESSON",
        using: "BTREE",
        fields: [
          { name: "lesson_id" },
        ]
      },
      {
        name: "FK_USER_LESSON_CLASS_CLASS",
        using: "BTREE",
        fields: [
          { name: "class_id" },
        ]
      },
    ]
  });
};
