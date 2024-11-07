import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext } from 'react';
import { AuthContext } from '../../helpers/AuthContext';
import axios from 'axios';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
export default function login() {
    const {setAuthState} = useContext(AuthContext)
    let navigate = useNavigate();
    let params = {
      headers:{
        accessToken: localStorage.getItem("accessToken")
      }
    } 
  
    let userid;
  
    useEffect(() => {
      if (params.headers.accessToken) {
        navigate("/")
      }
    }, []);



    const initialValue = {
      username: "",
      user_password: "",
    };

    // const handleSubmit = (data) => {
    //   axios.post("http://localhost:3001/auth/login", data).then((response) => {
    //     console.log()
    //     if (response.data.error) {  
    //       alert(response.data.error);
    //     } else {
    //       localStorage.setItem("accessToken", response.data.token);
    //       setAuthState({
    //         username: response.data.username,
    //         id: response.data.id,
    //         status: true,
    //       });
    //       navigate("/home");
    //     }

    //     // navigate(`/editLessons`)
    //   });
    // }

    const handleSubmit = async (data) => {
        try {
          const response = await axios.post("http://localhost:3001/auth/login", data);
          
          // Successful login
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          navigate("/");
        //   alert("Success")
        } catch (error) {
            console.log(error.status)
          if (error.status === 404) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            alert("Không tồn tại người dùng");
          } else if (error.request) {
            // The request was made but no response was received
            alert("No response received from server. Please try again later.");
          } else {
            // Something happened in setting up the request that triggered an Error
            alert("An error occurred. Please try again.");
          }
          console.error("Login error:", error);
        }
      };



    const validateSchema = Yup.object().shape({
      username: Yup.string().required(" Xin đừng để trống"),
      user_password: Yup.string().required(" Xin đừng để trống"),
    });

    return (
      <div className="login wrapper fadeInDown">
        <div id="formContent">
          {/* <!-- Tabs Titles --> */}
          <h2
            onClick={() => {
              navigate("/login");
            }}
            className="active underlineHover"
          >
            {" "}
            Sign In{" "}
          </h2>
          <h2
            onClick={() => {
              navigate("/register");
            }}
            className="inactive underlineHover"
          >
            Sign Up{" "}
          </h2>

          {/* <!-- Icon --> */}
          <div className="fadeIn first">
            <img src="/logoForWeb.png" id="icon" alt="User Icon" />
          </div>

          {/* <!-- Login Form --> */}
          <Formik
            initialValues={initialValue}
            validationSchema={validateSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field
                type="text"
                id="username"
                className="fadeIn second"
                name="username"
                placeholder="login"
              />
              <Field
                type="password"
                id="user_password"
                className="fadeIn third"
                name="user_password"
                placeholder="password"
              />
              <Field
                type="submit"
                className="fadeIn fourth"
                value="Log In"
                name="submit"
              />
            </Form>
          </Formik>

          {/* <!-- Remind Passowrd --> */}
          <div id="formFooter">
            <a className="underlineHover" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    );
}
