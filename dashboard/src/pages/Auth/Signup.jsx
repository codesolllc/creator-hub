import styles from "./auth.module.css";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import AuthTitleHead from "../../components/AuthTitleHead/AuthTitleHead";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "../../../axiosConfig";
import { useDispatch } from "react-redux";
import { authUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";


const Signup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [loader, setLoader] = useState(false);
  const [validationError, setValidationError] = useState({});
  const [signupFields, setSignupFields] = useState({
    f_name: "",
    l_name: "",
    email: "",
    number: "",
    password: "",
    cpassword: "",
    zip_code: "",
    gender: "",
    role_id: 0,
  });

  const handleSignupForm = (e) => {
    setSignupFields({ ...signupFields, [e.target.name]: e.target.value });
  };

  // User Register
  const registerUser = async (e) => {
    e.preventDefault();
    setLoader(true);
    console.log(signupFields, 'fields....');
    try {
      const res = await axiosInstance.post(`/register`, signupFields);
      if (res.data.status) {
        console.log(res.data);
        dispatch(authUser(res.data));
        setLoader(false);
        navigate("/");
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
      setValidationError(error?.response?.data?.errors);
    }
  };

  // Get Role of user
  useEffect(() => {
    (async function () {
      try {
        const res = await axiosInstance.get("/role");
        if (res?.data?.status) {
          setSignupFields({
            ...signupFields,
            ["role_id"]: res?.data?.data?.id,
          });
        }
      } catch (error) {
        console.log(error?.message);
        NotificationAlert(error?.message, "warning");
      }
    })();
  }, []);

  return (
    <AuthLayout>
      <div className={`${styles.authbox}`}>
        <AuthTitleHead title="Tell us about yourself" />
        <div className={`${styles.form_container}`}>
          <form className="row g-3">
            <div className="col-lg-6">
              <label htmlFor="f_name1" className="form-label text-light-gray">
                First Name
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="form-control"
                id="f_name1"
                name="f_name"
                value={signupFields.f_name}
                onChange={handleSignupForm}
              />
              <small>
                {validationError?.f_name?.[0] && "First name required"}
              </small>
            </div>
            <div className="col-lg-6">
              <label htmlFor="l_name1" className="form-label  text-light-gray">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="form-control"
                id="l_name1"
                name="l_name"
                value={signupFields.l_name}
                onChange={handleSignupForm}
              />
              <small>
                {validationError?.l_name?.[0] && "Last name required"}
              </small>
            </div>

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
                value={signupFields.email}
                onChange={handleSignupForm}
              />
              <small>{validationError?.email?.[0] && "email required"}</small>
            </div>

            <div className="col-12">
              <label
                htmlFor="inputNumber4"
                className="form-label  text-light-gray"
              >
                Number
              </label>
              <input
                type="number"
                placeholder="Number"
                className="form-control"
                id="inputNumber4"
                name="number"
                value={signupFields.number}
                onChange={handleSignupForm}
              />
              <small>{validationError?.number?.[0] && "Number required"}</small>
            </div>

            <div className="col-12">
              <label
                htmlFor="inputpassword4"
                className="form-label  text-light-gray"
              >
                Set a password
              </label>
              <div className={styles.password_field_box}>
                <input
                  type={passwordType}
                  placeholder="Set a password"
                  className="form-control"
                  id="inputpassword4"
                  name="password"
                  value={signupFields.password}
                  onChange={handleSignupForm}
                />
                <small>
                  {validationError?.password?.[0] && "Password required"}
                </small>

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
            <div className="col-12">
              <label
                htmlFor="inputpassword5"
                className="form-label  text-light-gray"
              >
                Confirm password
              </label>
              <input
                type={passwordType}
                placeholder="Confirm password"
                className="form-control"
                id="inputpassword5"
                name="cpassword"
                value={signupFields.cpassword}
                onChange={handleSignupForm}
              />
              <small>
                {validationError?.cpassword?.[0] && "Confirm password required"}
              </small>
            </div>
            <div className="col-12">
              <label htmlFor="inputZip" className="form-label  text-light-gray">
                Zip Code
              </label>
              <input
                type="text"
                placeholder="Zip Code"
                className="form-control"
                id="inputZip"
                name="zip_code"
                value={signupFields.zip_code}
                onChange={handleSignupForm}
              />
              <small>
                {validationError?.zip_code?.[0] && "zip code required"}
              </small>
            </div>

            <div className="col-12">
              <label htmlFor="inputZip" className="form-label  text-light-gray">
                Gender
              </label>
              <br />
              <input
                className="form-radio-input me-2"
                name="gender"
                value="M"
                type="radio"
                id="gridCheck1"
                onChange={handleSignupForm}
              />
              <label
                className="form-check-label me-3 text-light-gray"
                htmlFor="gridCheck1"
              >
                Male
              </label>
              <input
                className="form-radio-input me-2"
                name="gender"
                value="F"
                type="radio"
                id="gridCheck2"
                onChange={handleSignupForm}
              />
              <label
                className="form-check-label me-3  text-light-gray"
                htmlFor="gridCheck2"
              >
                Female
              </label>
              <input
                className="form-radio-input me-2"
                name="gender"
                value="O"
                type="radio"
                id="gridCheck3"
                onChange={handleSignupForm}
              />
              <label
                className="form-check-label  text-light-gray"
                htmlFor="gridCheck3"
              >
                Other
              </label>
              <br />
              <small>{validationError?.gender?.[0]}</small>
            </div>
            <hr />
            <div className="col-12 text-center">
              {loader ? (
                <Button
                  type="submit_btn"
                  text="Loading..."
                  action={(e) => e.preventDefault()}
                />
              ) : (
                <Button type="submit_btn" text="Submit" action={registerUser} />
              )}
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
