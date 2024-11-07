import { Box, colors, useTheme, Typography, InputBase } from "@mui/material";
import { theme_tokens } from "../../theme";
import Header from "../../components/Header";
import { ButtonBase } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../../components/ProductCard";
import Modal from "@mui/material/Modal";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
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
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function lesson() {
  const theme = useTheme();
  const colors = theme_tokens(theme.palette.mode);

  //danh sach cac list san pham
  const [lessonsCreated, setLessonsCreated] = useState([]);

  useEffect(() =>{
    axios.get("http://localhost:3001/lesson/").then((response) =>{
      // console.log(response.data)
      setLessonsCreated(response.data);
    })
  },[lessonsCreated])

  //navigate cac trang
  let navigate = useNavigate();


  //end nghiep vu xu ly data hien thi anh


  // Modal Open
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // setting của Slider
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  //add new lesson
  const initialValueLesson = {
    lesson_name: "",
    // time_limited: "",
    // need_explain: false,
  };

  //only user can add new lesson
  let params = {
    headers:{
      accessToken: localStorage.getItem("accessToken")
    }
  } 

  let userid;

  useEffect(() => {
    axios
      .post("http://localhost:3001/auth/getAuth/", params)
      .then((response) => {
        userid = response.data.id;
      });
  }, []);


  const handleSubmit = async (data) => {
    // console.log(data)
    // alert(data)
    // data.preventDefault();

    let params = {
      data: data,
      headers:{
        accessToken: localStorage.getItem("accessToken")
      }
    }
    console.log(params)
    
    // axios.post("http://localhost:3001/lesson", params).then((response) => {
    //   if (response.data.error) {
    //     alert(response.data.error);
    //   } else {
    //     console.log("Success Added to Database!");
        
    //     navigate(`/edit/lesson/${response.data.}`);
    //   }
    // });

    // const response = await axios.post("http://localhost:3001/lesson", params)
    
    // if (response.data.error) {
    //   alert(response.data.error)
    // }else{
    //   alert("Sắp chuyển trang")
    //   navigate(`/edit/lesson/${response.data.lesson_id}`)
    // }
  };

  


  const validateSchema = Yup.object().shape({
    lesson_name: Yup.string().required(" Xin đừng để trống"),
    time_limited: Yup.number().required(" Xin đừng để trống"),
  });

  return (
    <Box m={"20px"}>
      <Header
        title={"LESSONS"}
        subtitle={"Bài tập đã tạo hoặc bài tập bạn đã tham gia"}
      />
      {!lessonsCreated ? (
        <Box display={"flex"} justifyContent={"center"} marginTop={"5rem"}>
          <table>
            <tbody>
              <tr>
                <td>
                  <div className="no-content">
                    <div>
                      {theme.palette.mode === "dark" ? (
                        <img
                          src="../../src/assets/books.svg"
                          alt="nothing here"
                        />
                      ) : (
                        <img
                          src="../../src/assets/books-black.svg"
                          alt="nothing here"
                        />
                      )}
                    </div>
                    <div className="imgButton">
                      <h3>Opps! There is nothing here</h3>
                      <ButtonBase
                        sx={{
                          backgroundColor: colors.primary[400],
                          width: "fit-content",
                          height: "30px",
                          padding: "8px",
                          borderRadius: "8px",
                          color: "white",
                        }}
                        onClick={handleOpen}
                      >
                        Thêm bài tập
                      </ButtonBase>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Formik
                            initialValues={initialValue}
                            onSubmit={handleSubmit}
                            validationSchema={validateSchema}
                          
                          >
                            <Form>
                              <label>
                                Tên của bài học:
                              </label>
                              <Field
                                
                                name="lesson_name"
                                id="lesson_name"

                              ></Field>
                              <Field
                                id="submit-btn"
                                name="submit-btn"
                                type="submit"
                                value="Submit"
                              />
                                
                            </Form>
                          </Formik>
                        </Box>
                      </Modal>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      ) : (
        <Box m={"30px"}>
          <ButtonBase
            sx={{
              backgroundColor: colors.primary[400],
              width: "fit-content",
              height: "30px",
              padding: "8px",
              borderRadius: "8px",
              color: "white",
            }}
            onClick={handleOpen}
          >
            Thêm bài tập
          </ButtonBase>
          <ButtonBase
            sx={{
              backgroundColor: colors.primary[400],
              width: "fit-content",
              height: "30px",
              padding: "8px",
              borderRadius: "8px",
              margin: "3px",
              color: "white",
            }}
          >
            Xem thêm
          </ButtonBase>
          {/* end button */}

          {/* Modal mo ra cua so them bai tap vao */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Formik
                initialValues={initialValueLesson}
                validateSchema={validateSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Tên của bài học:
                  </Typography>
                  <Field
                      name="lesson_name"
                      id="lesson_name"
                  ></Field>
                  <ButtonBase
                    name="submit-btn"
                    type="submit"
                  >
                    Submit
                  </ButtonBase>
                </Form>
              </Formik>
            </Box>
          </Modal>

          {/* start slider to show lessons */}
          <h2>Bài tập của bạn</h2>
          <Box width={"1300px"} m={"30px"}>
            <Slider {...settings}>
              {lessonsCreated.map((value, index) => {
                return (
                  <div
                    onClick={() => {
                      navigate(
                        // `/practice/lesson/${value.lesson_id}/question/${
                        //   !value.Questions.length >= 1
                        //     ? undefined
                        //     : value.Questions[0].question_id
                        // }` BỎ
                        `/practice/lesson/${value.lesson_id}`
                      );
                    }}
                    key={index} 
                  >
                    <ProductCard title={value.lesson_name} />
                  </div>
                );
              })}
            </Slider>
          </Box>
          <Box marginTop={"3rem"}>
            <h2>Bài tập bạn từng làm</h2>
            <Box width={"1300px"} m={"30px"}>
              <Slider {...settings}>
                {lessonsCreated.map((value, index) => {
                  return (
                    <div 
                      onClick={() => {
                        navigate(
                          `/practice/lesson/${value.lesson_id}
                          }`
                          // `/practice/lesson/${value.lesson_id}/question/${
                          //   !value.Questions.length >= 1
                          //     ? undefined
                          //     : value.Questions[0].question_id
                          // }` //bỏ
                        );
                      }}
                      key={index} 
                    >
                      <ProductCard title={value.lesson_name} />
                    </div>
                  );
                })}
              </Slider>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
