const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const initModels = require("../models/init-models");
const { sequelize } = require("../models");
const { validatedToken } = require('../middlewares/AuthMiddleware');
const { dvalidatedToken } = require('../middlewares/AuthMiddlewareDelete');
var models = initModels(sequelize);
router.get("/byUserID/:userid", async (req, res) => {
  const user_id = req.params.userid;
  const listOfLesson = await models.Lessons.findAll( {where: {created_by: user_id}, include:[{model: models.Question, attributes:['question_id'], as: "Questions"}]} );
  res.json(listOfLesson);
});

router.get("/", async (req, res) => {
  const listOfLesson = await models.Lessons.findAll( {include:[{model: models.Question, as: "Questions"}]} );
  res.json(listOfLesson);
});

// router.post('/', async (req,res) =>{
//     let details = {
//         name: req.body.name,
//         description: req.body.description
//     };
//     await ThuCung.create({name: details.name , description: details.description}).then(console.log("Saved successfully!"));
//     res.json(details);
// });

router.post("/" ,validatedToken,async (req, res) => {
  const username_id = req.user.id;
  // console.log(username_id);
  // console.log(req.body)
  let details = {
    lesson_name: req.body.data.lesson_name,
    created_by: username_id,
    time_limited: req.body.data.time_limited,
    need_explain: req.body.data.need_explain,
  };
  console.log(details)

  const newLesson = await models.Lessons.create({
    lesson_name: details.lesson_name,
    created_by: details.created_by,
    time_limited: details.time_limited,
    need_explain: details.need_explain,
  }).then(console.log("Thêm Thành Công!"));
  res.json(newLesson);
});

router.delete( "/api/delete/:lesson_id" ,dvalidatedToken, async (req, res)=>{
  let lesson_id = req.params.lesson_id;
  await models.Lessons.destroy({where: {lesson_id: lesson_id}})
  res.json(req.params);
})

module.exports = router;
