import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./auth.module.css";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import AuthTitleHead from "../../components/AuthTitleHead/AuthTitleHead";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../axiosConfig";
import { authUser } from "../../redux/userSlice";

const Login = () => {
  const isLoggin = useSelector((state) => state?.isLoggin);
  const navigation = useNavigate();

  useEffect(() => {
    if (isLoggin) {
      navigation("/dashboard");
    }
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginFields, setLoginFields] = useState({
    email: "",
    password: "",
  });

  const handleLoginForm = (e) => {
    setLoginFields({ ...loginFields, [e.target.name]: e.target.value });
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    if (loginFields.email && loginFields.password) {
      setLoader(true);
      setErrorMessage("");
      try {
        const res = await axiosInstance.post(`/admin/login_admin`, loginFields);
        if (res.status === 200) {
          dispatch(authUser(res.data));
          setLoader(false);
          navigate("/dashboard");
        }
      } catch (error) {
        setLoader(false);
        setErrorMessage(error?.response?.data?.message);
        console.log(error, "xxxxxxxxxxx");
      }
    } else {
      setErrorMessage("All Feilds Required!");
    }
  };

  return (
    <AuthLayout>
      <div className={`${styles.authbox}`}>
        <AuthTitleHead title="Welcome Back!" />
        <div className={`${styles.form_container}`}>
          <span style={{ color: "red", fontWeight: 600 }} className="mb-3">
            {errorMessage && errorMessage}
          </span>
          <form className="row g-3">
            <div className="col-12">
              <label
                htmlFor="inputEmail4"
                className="form-label  text-light-gray"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                id="inputEmail4"
                name="email"
                value={loginFields.email}
                onChange={handleLoginForm}
              />
            </div>

            <div className="col-12">
              <label
                htmlFor="inputpassword4"
                className="form-label  text-light-gray"
              >
                Password
              </label>
              <div className={styles.password_field_box}>
                <input
                  type={passwordType}
                  placeholder="Password"
                  className="form-control"
                  id="inputpassword4"
                  name="password"
                  value={loginFields.password}
                  onChange={handleLoginForm}
                />

                {passwordType === "password" ? (
                  <FaEyeSlash
                    className={styles.p_eye_icon}
                    onClick={() => setPasswordType("text")}
                  />
                ) : (
                  <FaEye
                    className={styles.p_eye_icon}
                    onClick={() => setPasswordType("password")}
                  />
                )}
              </div>
            </div>

            <hr />
            <div className="col-12 text-center">
              {loader ? (
                <Button
                  type="login_btn mb-3"
                  text="Loading..."
                  action={(e) => e.preventDefault()}
                />
              ) : (
                <Button
                  type="login_btn mb-3"
                  text="Login"
                  action={handleUserLogin}
                />
              )}
              <br />
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
