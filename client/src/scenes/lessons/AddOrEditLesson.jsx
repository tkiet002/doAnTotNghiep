
import Slider from "react-slick";
import Modal from "@mui/material/Modal";
import { theme_tokens } from "../../theme";
import { useTheme } from '@emotion/react';
import { useRef, useState, useContext } from 'react';
import { Box,FormControl, InputLabel, MenuItem, Select, InputBase } from '@mui/material';
import React from "react";
import { Formik, Form,Field } from "formik";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {AuthContext} from '../../helpers/AuthContext'
import * as Yup from 'yup'

function NextArrow(props) {
  const theme = useTheme();
  const colors = theme_tokens(theme.palette.mode);





  
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: colors.primary[400] }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const theme = useTheme();
  const colors = theme_tokens(theme.palette.mode);
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: colors.primary[400] }}
      onClick={onClick}
    />
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '35%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};






export default function AddOrEditLesson() {

  //context
  let {authState} = useContext(AuthContext);
  
  let params = {
    headers:{
      accessToken: localStorage.getItem("accessToken")
    }
  } 

  let [userid, setUserId] = useState(0);

  useEffect(() => {
    axios
      .post("http://localhost:3001/auth/getAuth/", params)
      .then((response) => {
        
        //userid = response.data.id;
        setUserId(response.data.id)
        
      });

    
  }, []);


  //hien thi du lieu
  let {lesson_id} = useParams();
  let [index, setIndex] = useState(0)
  
  
  let navigate = useNavigate();




  const [loading, setLoading] = useState(true); 





  //cho slider
  const [slideIndex, setSlideIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  let sliderRef = useRef(null);

  //Modal cho việc chỉnh sửa

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  //Modal cho việc xóa

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDeleteModal = () => setOpenDelete(true);
  const handleCloseDeleteModal = () => setOpenDelete(false);

  //end logic





  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: () => setUpdateCount(updateCount + 1),
    beforeChange: (current, next) => setSlideIndex(next)
  };


  //delete bai
  const DeleteLesson = async (event) =>{
    

    try {
      const response = await axios.delete(
        `http://localhost:3001/lesson/api/delete/${lesson_id}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      console.log(response.data.lesson_id)
      if (response.data.lesson_id) {
        alert("Xóa thành công " + response.data.lesson_id)
        navigate("/edit")
      }

    } catch (error) {
      alert(error);
    }
  }
    
  

  //load data from api cho việc hiện dữ liệu
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(`http://localhost:3001/question/byId/${lesson_id}`);
        
        setQuestions(response);
      } catch (error) {
        console.error(error)
      }
      setLoading(false);
    };

    fetchData();
  }, []);
  


  //Open Modal Add

  let [openAdd, setOpenAdd] = React.useState(false);

  const handleOpenAdd = () =>{
    setOpenAdd(true)
  }
  const handleCloseAdd = () =>{
    setOpenAdd(false)
  }


  
  //add data

  const initialValue = {
    question_text: "",
    created_by: userid,
    lesson_id: lesson_id,
    explaination: "",
    optA: "",
    optB: "",
    optC: "",
    optD: "",
    OptAIsRight: false,
    OptBIsRight: false,
    OptCIsRight: false,
    OptDIsRight: false,
  };


  const validateSchema = Yup.object().shape({
    question_text: Yup.string().required(" Xin đừng để trống"),
    // created_by: Yup.number().required(" Xin đừng để trống"),
    // explaination: Yup.string().required(" Xin đừng để trống"),
    optA: Yup.string().required(" Xin đừng để trống"),
    optB: Yup.string().required(" Xin đừng để trống"),
    optC: Yup.string().required(" Xin đừng để trống"),
    optD: Yup.string().required(" Xin đừng để trống"),
  });
  
  const handleSubmitAdd = async(data) =>{
    let params = {
      data: data,
      headers:{
        accessToken: localStorage.getItem("accessToken")
      }
    }
    
    const response = await axios.post("http://localhost:3001/question", params)
    

    // if (response.data.error) {
    //   alert(response.data.error)
    // }

    // const newQuestion = 
    if (response) {
      setOpenAdd(false)
      setQuestions([...questions,response.data ]);
    }
    
  }
  const handleSubmitUpdate = async(data) =>{
    try {
      // const response = await axios.put(
      //   `http://localhost:3001/question/update/${data.question_id}`,
      //   {
      //     headers: {
      //       accessToken: localStorage.getItem("accessToken"),
      //     },
      //   }
      // );
      console.log(data.question_id)
      if (data.question_id) {
        alert("Sửa thành công " + data.question_id)
      }
      setOpen(false);

    } catch (error) {
      alert(error);
    }
  }


  const handleDeleteQuestion = async (event,question_id) =>{
    event.preventDefault();
    // let params = {
    //   data: data,
    //   headers:{
    //     accessToken: localStorage.getItem("accessToken")
    //   }
    // }

    // console.log(params)
    // console.log(question_id)
    const response = await axios.delete(
      `http://localhost:3001/question/api/delete/${question_id}`,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    );
    if(response) alert(response.data)
    console.log(response.data)
    window.location.reload();
  }

  return (
    <>
      {loading && <div>Loading</div>}
      {!loading && (

        <Box width={"1000px"} margin={"auto"} marginTop={"50px"}>
          <Link to={"/"}>Back</Link>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Câu hỏi cần đến
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Câu hỏi cần đến"
              onChange={(e) => sliderRef.slickGoTo(e.target.value)}
              value={slideIndex}
            >
              {questions.map((_, index) => (
                <MenuItem key={index} value={index}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box>
            <button onClick={handleOpenDeleteModal}>Xóa bài học</button>
            <Modal
              open={openDelete}
              onClose={handleCloseDeleteModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <h1>Bạn muốn xóa bài này?</h1>
                <button
                  style={{ padding: "10px", width: "100px", margin: "5px" }}
                  onClick={DeleteLesson}
                >
                  Yes
                </button>
                <button
                  style={{ padding: "10px", width: "100px", margin: "5px" }}
                  onClick={handleCloseDeleteModal}
                >
                  No
                </button>
              </Box>
            </Modal>
          </Box>
          <div className="slider-container">
            <Slider
              ref={(slider) => {
                sliderRef = slider;
              }}
              {...settings}
            >
              
                {questions.map((value, index) => {
                  return (
                    <>
                      <div key={index}>
                        <Box height={"fit-content"} m={"15px"} >
                          <div className="edit-container">
                            <button onClick={handleOpen}>
                              Chỉnh sửa câu hỏi
                            </button>
                            <button
                              onClick={(data) => {
                                handleDeleteQuestion(data, value.question_id);
                              }}
                            >
                              Xóa câu hỏi này
                            </button>
                            <hr />
                            <h2>{value.question_text}</h2>
                            <ul>
                              <li>{value.Question_Choices[0].choice_text}</li>
                              <li>{value.Question_Choices[1].choice_text}</li>
                              <li>{value.Question_Choices[2].choice_text}</li>
                              <li>{value.Question_Choices[3].choice_text}</li>
                            </ul>
                            {/* <button>Thêm một câu hỏi khác</button> */}
                            <div className="question-index">
                              0 of 1 Questions
                            </div>
                          </div>
                          <Box>
                            <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={style}>
                                <div className="edit-container-modal">
                                  <hr />
                                  <Formik
                                    initialValues={initialValue}
                                    validationSchema={validateSchema}
                                    onSubmit={(values, action) => {
                                      handleSubmitUpdate(values);
                                      console.log(values);
                                    }}
                                  >
                                    <Form>
                                      <Field
                                        type="text"
                                        name="question_text_u"
                                        id="question_text_u"
                                        className="question_text"
                                        placeholder="Câu hỏi"
                                      />
                                      <Field
                                        type="text"
                                        name="optA_u"
                                        id="optA_u"
                                        className="question-choice"
                                        placeholder={
                                          "Đáp án A"
                                        }
                                      />
                                      <Field
                                        type="text"
                                        name="optB_u"
                                        id="optB_u"
                                        className="question-choice"
                                        placeholder={
                                          "Đáp án B"
                                        }
                                      />
                                      <Field
                                        type="text"
                                        name="optC_u"
                                        id="optC_u"
                                        className="question-choice"
                                        placeholder={
                                          "Đáp án C"
                                        }
                                      />
                                      <Field
                                        type="text"
                                        name="optD_u"
                                        id="optD_u"
                                        className="question-choice"
                                        placeholder={
                                          "Đáp án D"
                                        }
                                      />
                                    </Form>
                                  </Formik>
                                  <button>Chỉnh sửa</button>
                                  <div className="question-index">
                                    0 of 1 Questions
                                  </div>
                                </div>
                              </Box>
                            </Modal>
                          </Box>
                        </Box>
                      </div>
                    </>
                  );
                })}
            
              
              <div key={index}>
                <Box height={"fit-content"} m={"15px"}>
                  <div className="edit-container">
                    <button onClick={handleOpenAdd}>Thêm câu hỏi</button>
                    <Modal
                      open={openAdd}
                      onClose={handleCloseAdd}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <div className="edit-container-modal">
                          <hr />
                          <Formik
                            initialValues={initialValue}
                            validationSchema={validateSchema}
                            onSubmit={(values, action) =>{
                              handleSubmitAdd(values);
                              console.log(values)
                            }}
                          >
                            <Form>
                              <Field
                                type="text"
                                name="question_text"
                                id="question_text"
                                className="question-text"
                                placeholder="Nội dung câu hỏi"
                              />
                              <Field
                                type="text"
                                name="optA"
                                id="optA"
                                className="question-choice"
                                placeholder="Câu hỏi 1"
                              />
                              <Field
                                type="text"
                                name="optB"
                                id="optB"
                                className="question-choice"
                                placeholder="Câu hỏi 2"
                              />
                              <Field
                                type="text"
                                name="optC"
                                id="optC"
                                className="question-choice"
                                placeholder="Câu hỏi 3"
                              />
                              <Field
                                type="text"
                                name="optD"
                                id="optD"
                                className="question-choice"
                                placeholder="Câu hỏi 4"
                              />
                              <div>
                              <label htmlFor="OptAIsRight"> A Là đáp án chính xác?</label>
                                <Field
                                  type="checkbox"
                                  name="OptAIsRight"
                                  id="OptAIsRight"
                                ></Field>
                                <label htmlFor="OptBIsRight">B Là đáp án chính xác?</label>
                                <Field
                                  type="checkbox"
                                  name="OptBIsRight"
                                  id="OptBIsRight"
                                ></Field>
                                <label htmlFor="OptCIsRight">C Là đáp án chính xác?</label>
                                <Field
                                  type="checkbox"
                                  name="OptCIsRight"
                                  id="OptCIsRight"
                                ></Field>
                                <label htmlFor="OptDIsRight">D Là đáp án chính xác?</label>
                                <Field
                                  type="checkbox"
                                  name="OptDIsRight"
                                  id="OptDIsRight"
                                ></Field>
                              </div>
                              <button type="submit">Add</button>
                            </Form>
                          </Formik>

                          
                        </div>
                      </Box>
                    </Modal>
                  </div>
                </Box>
              </div>
            </Slider>
          </div>
        </Box>
      )}

      {/* <div className="practice-container" key={index}>
        <h1>QuizThis</h1>
        <hr />
        <h2>nani</h2>
        <ul>
          <li
            ref={Option1}
          >
            1
          </li>
          <li
            
            ref={Option2}
          >
            2
          </li>
          <li
            ref={Option3}
          >
            3
          </li>
          <li
            ref={Option4}
          >
            4
          </li>
        </ul>
        <button onClick={handleNext}>Thêm một câu hỏi khác</button>
        <div className="question-index">
          {index + 1} of {question.length} Questions
        </div>
      </div> */}
    </>
  );
}
