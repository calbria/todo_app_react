/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Field from "../../components/loginField/field";
import { EMAL_REGEX, PWD_REGEX } from "../../constants/regEx";
import { EMAIL_HINT, PWD_HINT } from "../../constants/messages";
import { SIGNIN_URL } from "../../constants/url";
import "./register.scss";

export default function LoginForm({ signupBtnHandler, signin }) {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [errMessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState(true);

  let disabled = validEmail && validPwd;

  useEffect(() => {
    const result = EMAL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(pwd);
    setValidPwd(result);
  }, [pwd]);

  async function submitHandler(e) {
    e.preventDefault();
    console.log("Sign in submit");
    try {
      const response = await fetch(SIGNIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: pwd,
        }),
      });
      console.log(response);
      setSuccess(true);
      if (response.ok) {
        signin(true);
      } else if (response.status === 401) {
        setErrMessage("User is not authorized");
      } else {
        setErrMessage("404: not found. Registration failed");
      }
      const data = await response.json();
      console.log(data);

      setEmail("");
      setPwd("");
    } catch (err) {
      console.log("ERROR", err.message);
      setSuccess(false);
      setErrMessage(err.message);
    }
  }

  return (
    <>
      <h2 className="login-form__header">Login</h2>
      <p>Please sign in to continue</p>
      {success ? (
        <>
          <p className={errMessage ? "errorMsg" : "errorHide"}>{errMessage}</p>
          <form className="form login-form" onSubmit={submitHandler}>
            <Field
              type="email"
              id="email"
              placeholder="Enter your email "
              labelText="Email"
              onChangeHandler={(e) => setEmail(e.target.value)}
              val={email}
              valid={validEmail}
              hintText={EMAIL_HINT}
            />

            <Field
              type="password"
              id="pwd"
              placeholder="Password "
              labelText="Password"
              onChangeHandler={(e) => setPwd(e.target.value)}
              val={pwd}
              valid={validPwd}
              hintText={PWD_HINT}
            />
            <button
              type="submit"
              disabled={disabled ? false : true}
              className="login-form__btn"
            >
              LOGIN
            </button>
          </form>
          <p>
            Don&apos;t have an account?{" "}
            <span className="sign-btn" onClick={signupBtnHandler}>
              Sign up
            </span>
          </p>
        </>
      ) : (
        <p>404: Error</p>
      )}
    </>
  );
}
