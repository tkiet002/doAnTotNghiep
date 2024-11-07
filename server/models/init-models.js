var DataTypes = require("sequelize").DataTypes;
var _Class = require("./Class");
var _Lessons = require("./Lessons");
var _Question = require("./Question");
var _Question_Choice = require("./Question_Choice");
var _Roles = require("./Roles");
var _User_Question_Choice = require("./User_Question_Choice");
var _User_lesson_class = require("./User_lesson_class");
var _Users = require("./Users");

function initModels(sequelize) {
  var Class = _Class(sequelize, DataTypes);
  var Lessons = _Lessons(sequelize, DataTypes);
  var Question = _Question(sequelize, DataTypes);
  var Question_Choice = _Question_Choice(sequelize, DataTypes);
  var Roles = _Roles(sequelize, DataTypes);
  var User_Question_Choice = _User_Question_Choice(sequelize, DataTypes);
  var User_lesson_class = _User_lesson_class(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  Question_Choice.belongsToMany(Users, { as: 'user_id_Users', through: User_Question_Choice, foreignKey: "choice_id", otherKey: "user_id" });
  Users.belongsToMany(Question_Choice, { as: 'choice_id_Question_Choices', through: User_Question_Choice, foreignKey: "user_id", otherKey: "choice_id" });
  User_lesson_class.belongsTo(Class, { as: "class", foreignKey: "class_id"});
  Class.hasMany(User_lesson_class, { as: "User_lesson_classes", foreignKey: "class_id"});
  Question.belongsTo(Lessons, { as: "lesson", foreignKey: "lesson_id"});
  Lessons.hasMany(Question, { as: "Questions", foreignKey: "lesson_id"});
  User_lesson_class.belongsTo(Lessons, { as: "lesson", foreignKey: "lesson_id"});
  Lessons.hasMany(User_lesson_class, { as: "User_lesson_classes", foreignKey: "lesson_id"});
  Question_Choice.belongsTo(Question, { as: "question", foreignKey: "question_id"});
  Question.hasMany(Question_Choice, { as: "Question_Choices", foreignKey: "question_id"});
  User_Question_Choice.belongsTo(Question_Choice, { as: "choice", foreignKey: "choice_id"});
  Question_Choice.hasMany(User_Question_Choice, { as: "User_Question_Choices", foreignKey: "choice_id"});
  Users.belongsTo(Roles, { as: "role_Role", foreignKey: "role"});
  Roles.hasMany(Users, { as: "Users", foreignKey: "role"});
  Class.belongsTo(Users, { as: "class", foreignKey: "class_id"});
  Users.hasOne(Class, { as: "Class", foreignKey: "class_id"});
  Lessons.belongsTo(Users, { as: "created_by_User", foreignKey: "created_by"});
  Users.hasMany(Lessons, { as: "Lessons", foreignKey: "created_by"});
  Question.belongsTo(Users, { as: "created_by_User", foreignKey: "created_by"});
  Users.hasMany(Question, { as: "Questions", foreignKey: "created_by"});
  User_Question_Choice.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(User_Question_Choice, { as: "User_Question_Choices", foreignKey: "user_id"});
  User_lesson_class.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(User_lesson_class, { as: "User_lesson_classes", foreignKey: "user_id"});

  return {
    Class,
    Lessons,
    Question,
    Question_Choice,
    Roles,
    User_Question_Choice,
    User_lesson_class,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
