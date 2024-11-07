import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function register() {
  let navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);
  const initialValue = {
    name: "",
    username: "",
    password: "",
    repassword: "",
    email: "",
  };

  const validateSchema = Yup.object().shape({
    name: Yup.string().required(" Xin đừng để trống"),
    username: Yup.string().required(" Xin đừng để trống"),
    password: Yup.string().required(" Xin đừng để trống"),
    repassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Password không giống"
    ),
    email: Yup.string().required(" Xin đừng để trống"),
  });

  //dang ky
  const handleSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        data
      );
      localStorage.setItem("accessToken", response.data.token);
      setAuthState({
        username: response.data.username,
        id: response.data.id,
        status: true,
      });
      alert("Success");
      navigate(`/`);
    } catch (error) {
      if (error.status === 400) {
        alert(error);
      }
    }
  };

  return (
    <div className="login wrapper fadeInDown">
      <div id="formContent">
        {/* <!-- Tabs Titles --> */}
        <h2
          onClick={() => {
            navigate("/login");
          }}
          className="inactive"
        >
          {" "}
          Sign In{" "}
        </h2>
        <h2
          onClick={() => {
            navigate("/register");
          }}
          className="active underlineHover"
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
              id="name"
              className="fadeIn second"
              name="name"
              placeholder="Họ và tên"
            />
            <ErrorMessage name="name" component="span" />
            <Field
              type="text"
              id="username"
              className="fadeIn third"
              name="username"
              placeholder="Tên đăng nhập"
            />
            <ErrorMessage name="username" component="span" />
            <Field
              type="password"
              id="password"
              className="fadeIn third"
              name="password"
              placeholder="mật khẩu"
            />
            <ErrorMessage name="password" component="span" />
            <Field
              type="password"
              id="repassword"
              className="fadeIn third"
              name="repassword"
              placeholder="nhập lại mật khẩu"
            />
            <ErrorMessage name="repassword" component="span" />
            <Field
              type="text"
              id="email"
              className="fadeIn third"
              name="email"
              placeholder="email"
            />
            <ErrorMessage name="email" component="span" />
            <Field
              type="submit"
              className="fadeIn fourth"
              value="Đăng ký"
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
