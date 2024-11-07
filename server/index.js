const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// const sequelize = new Sequelize("QUIZTHIS", "root", "namromss4//123", {
//   host: "localhost",
//   dialect: "mysql",
// });



const db = require("./models");

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

//All Router
 const userRouter = require('./routes/Users');
 app.use("/auth", userRouter);

 const questionRouter = require("./routes/Question");
 app.use("/question", questionRouter)


 const lessonRouter = require("./routes/Lesson");
 app.use("/lesson", lessonRouter);

 
 //end router
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server started successfully on ${port}`);
  });
});
