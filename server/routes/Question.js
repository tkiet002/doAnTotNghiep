const express = require("express");
const router = express.Router();
const {Sequelize, where} = require("sequelize");
const initModels = require("../models/init-models");
const { sequelize } = require("../models");
const {dvalidatedToken} = require("../middlewares/AuthMiddlewareDelete");
const {sql} = require("@sequelize/core");
const Question = require("../models/Question");
const { validatedToken } = require('../middlewares/AuthMiddleware');

var models = initModels(sequelize);
router.get("/", async (req, res) => {
  const listOfQuestion = await models.Question.findAll({
    
    include: [
      {
        model: models.Question_Choice,
        attributes: ["choice_id", "choice_text","is_right"],
        as: "Question_Choices"
      },
    ],
  });

  res.json(listOfQuestion);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfQuestion = await models.Question.findAll({
    where: {lesson_id: id},
    include: [
      {
        model: models.Question_Choice,
        attributes: ["choice_id", "choice_text", "is_right"],
        as: "Question_Choices"
      },
    ],
  });

  res.json(listOfQuestion);
});


// router.post('/', async (req,res) =>{
//     let details = {
//         name: req.body.name,
//         description: req.body.description
//     };
//     await ThuCung.create({name: details.name , description: details.description}).then(console.log("Saved successfully!"));
//     res.json(details);
// });

router.post("/",validatedToken,  async (req, res) => {
  let details = req.body.data;
  let lastInsert = 0;

  console.log(details)
  let createdQuestion = await models.Question.create({
    question_text: details.question_text,
    created_by: details.created_by,
    lesson_id: details.lesson_id,
    explaination: details.explanation,
  }).then((result) =>{
    lastInsert = result.question_id;
  });
  
  

  const test = await models.Question_Choice.create({
    question_id: lastInsert,
    choice_text: details.optA,
    is_right: details.OptAIsRight
  });
  console.log(details.OptAIsRight);
  await models.Question_Choice.create({
    question_id: lastInsert,
    choice_text: details.optB,
    is_right: details.OptBIsRight
  });
  await models.Question_Choice.create({
    question_id: lastInsert,
    choice_text: details.optC,
    is_right: details.OptCIsRight
  })
  await models.Question_Choice.create({
    question_id: lastInsert,
    choice_text: details.optD,
    is_right: details.OptDIsRight
  })

  const questionJustCreated = await models.Question.findOne({
    where: { question_id: lastInsert },
    include: [
      {
        model: models.Question_Choice,
        attributes: ["choice_id", "choice_text", "is_right"],
        as: "Question_Choices",
      },
    ],
  });
  res.json(questionJustCreated);
});


router.put("/update/:id",dvalidatedToken, async (req, res) => {
  try {
    const { id } = req.params;
    // const data = req.body;
    const details = {
      question_text: req.body.question_text,
      created_by: req.body.created_by,
      lesson_id: req.body.lesson_id,
      explaination: "",
      optA: req.body.optA,
      optB: req.body.optB,
      optC: req.body.optC,
      optD: req.body.optD,
      OptAIsRight: req.body.OptAIsRight,
      OptBIsRight: req.body.OptBIsRight,
      OptCIsRight: req.body.OptCIsRight,
      OptDIsRight: req.body.OptDIsRight,
    };
    console.log("If return " + (details.OptAIsRight || details.OptBIsRight || details.OptCIsRight || details.OptDIsRight))
    if((details.OptAIsRight || details.OptBIsRight || details.OptCIsRight || details.OptDIsRight) === false) res.json({error: "Cả 4 kết quả không thể cùng sai được"})

    const updateQuestion = await models.Question.findOne({
      where: { question_id: id },
      include: [
        {
          model: models.Question_Choice,
          attributes: ["choice_id", "choice_text", "is_right"],
          as: "Question_Choices",
        },
      ],
    });

    updateQuestion.question_text = details.question_text

    //cap nhat dap an A table Question_Choices
    updateQuestion.Question_Choices[0].choice_text = details.optA
    updateQuestion.Question_Choices[0].is_right = details.OptAIsRight
    
    //cap nhat dap an B table Question_Choices
    updateQuestion.Question_Choices[1].choice_text = details.optB
    updateQuestion.Question_Choices[1].is_right = details.OptBIsRight
    
    //cap nhat dap an C table Question_Choices
    updateQuestion.Question_Choices[2].choice_text = details.optC
    updateQuestion.Question_Choices[2].is_right = details.OptCIsRight


    //cap nhat dap an D table Question_Choices
    updateQuestion.Question_Choices[3].choice_text = details.optD
    updateQuestion.Question_Choices[3].is_right = details.OptDIsRight


    //du lieu a updateQuestion se tra ve
    //   {
    //     "question_id": 1,
    //     "question_text": "Cách để được Fauna yêu",
    //     "is_active": true,
    //     "lesson_id": 1,
    //     "explaination": null,
    //     "created_by": 1,
    //     "Question_Choices": [
    //         {
    //             "choice_id": 2,
    //             "choice_text": "Uống thuốc 1",
    //             "is_right": true
    //         },
    //         {
    //             "choice_id": 3,
    //             "choice_text": "Uống thuốc 2",
    //             "is_right": false
    //         },
    //         {
    //             "choice_id": 4,
    //             "choice_text": "Uống thuốc 3",
    //             "is_right": false
    //         },
    //         {
    //             "choice_id": 5,
    //             "choice_text": "Uống thuốc 4",
    //             "is_right": false
    //         }
    //     ]
    // }

    const updated = await updateQuestion.save()
    res.json(updated);
  } catch (error) {
    console.log(error)
  }

  
});


router.delete( "/api/delete/:question_id" ,dvalidatedToken, async (req, res)=>{
  let question_id = req.params.question_id;
  const response = await models.Question.destroy({where: {question_id: question_id}})
  res.json(response);
})


module.exports = router;
