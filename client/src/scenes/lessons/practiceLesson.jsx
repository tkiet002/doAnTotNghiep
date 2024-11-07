import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
export default function practiceLesson() {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState([])
  
  let {lesson_id}  = useParams();
  let navigate = useNavigate();

  const [loading, setLoading] = useState(true); // loading screen

  //fetch data from database to display and set it into question variable
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(`http://localhost:3001/question/byId/${lesson_id}`);
        // console.log(response)
        setQuestion(response);
      } catch (error) {
        console.error(error)
      }
      setLoading(false);
    };

    fetchData();
  }, []);


  let [result, setResult] = useState(false);
  //next button 
  const handleNext = () =>{
    if (lock === true) {
      if (index == question.length - 1) {
        setResult(true)
      } else {
        setIndex(index + 1);
        setLock(false)
      }
    }
    // console.log(question[index])
  }

  //previous button
  const handlePrevious = () =>{
    if (index < 0) {
      setIndex[question.length - 1]
    }else{
      setIndex(index - 1)
    }
    // console.log(question[index])
  }

  const handleReset = () =>{
    setIndex(0)
    setLock(false)
    setResult(false)
    setScore(0)
  }

  //answer checking logic 
  const [lock, setLock] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1,Option2,Option3,Option4]


  let [score, setScore] = useState(0);


  let scorePerQuestion = 10/question.length;

  const checkingAnswer = (e, choiceId) =>{
    if (loading) {
      setTimeout(()=>{
        console.log("Hello World")
      }, 3000)
    }else{
      const choice = question[index].Question_Choices.find(c => c.choice_id === choiceId);
      const rightChoice = question[index].Question_Choices.find(c => c.is_right === true);
      if (lock === false) {
        if(choice === rightChoice){
            e.target.classList.add("correct")
            setScore(prev => prev + scorePerQuestion)
          }else{
            e.target.classList.add("wrong")
            option_array[rightChoice.is_right - 1].current.classList.add("correct")
          }
        setLock(true);
      }else{

      }

      
    //   return choice ? choice.is_right : false;
    }
  }
  //end of checking logic

  


  return (
    <>
      {loading && <div>Loading</div>}
      {result ? (
        <>
          <div className="practice-container" key={index}>
            <h2>Số điểm bạn đạt được là: {score}</h2>
            <button onClick={handleReset}>Muốn thử lại không?</button>
            <button onClick={() => {
                navigate("/lessons")
            }}>Về trang trủ</button>
          </div>
        </>
      ) : (
        <>
          {!loading && (
            <div className="practice-container" key={index}>
              <h1>QuizThis</h1>
              <hr />
              <h2>{question[index].question_text}</h2>
              <ul>
                <li
                  onClick={(e) => {
                    checkingAnswer(
                      e,
                      question[index].Question_Choices[0].choice_id
                    );
                  }}
                  ref={Option1}
                >
                  {question[index].Question_Choices[0].choice_text}
                </li>
                <li
                  onClick={(e) => {
                    checkingAnswer(
                      e,
                      question[index].Question_Choices[1].choice_id
                    );
                  }}
                  ref={Option2}
                >
                  {question[index].Question_Choices[1].choice_text}
                </li>
                <li
                  onClick={(e) => {
                    checkingAnswer(
                      e,
                      question[index].Question_Choices[2].choice_id
                    );
                  }}
                  ref={Option3}
                >
                  {question[index].Question_Choices[2].choice_text}
                </li>
                <li
                  onClick={(e) => {
                    checkingAnswer(
                      e,
                      question[index].Question_Choices[3].choice_id
                    );
                  }}
                  ref={Option4}
                >
                  {question[index].Question_Choices[3].choice_text}
                </li>
              </ul>
              <button onClick={handleNext}>Next</button>
              <div className="question-index">
                {index + 1} of {question.length} Questions
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
  
}
