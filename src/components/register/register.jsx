/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Field from "./field/field";
import { NAME_REGEX, EMAL_REGEX, PWD_REGEX } from "../../constants/regEx";
import { SIGNUP_URL } from "../../constants/url";
import { NAME_HINT, EMAIL_HINT, PWD_HINT, MATCH_HINT } from "../../constants/messages";
import "./register.scss";


export default function RegisterForm({ signinBtnHandler, signup, setAccessToken }) {
  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [errMessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState(true);

  let disabled =
    validFirstName && validLastName && validEmail && validPwd && validMatch;

    // Vlidation
  useEffect(() => {
    const result = NAME_REGEX.test(firstName);
    setValidFirstName(result);
  }, [firstName]);
  useEffect(() => {
    const result = NAME_REGEX.test(lastName);
    setValidLastName(result);
  }, [lastName]);
  useEffect(() => {
    const result = EMAL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd && pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  async function submitHandler(e) {
    e.preventDefault();
    console.log("Sign up submit");
    try {
      const response = await fetch(SIGNUP_URL, { 
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }, 
        body: JSON.stringify({
            email: email,
            password: pwd,
            firstName: firstName,
            lastName: lastName
        }) });
        console.log(response);
       setSuccess(true)
        if (response.ok) {
            
            signup(true);
        } else if(response.status === 409) {
            setErrMessage("User with such email already exists");
        } else {
            setErrMessage("404: not found. Registration failed");
        }
        const data = await response.json();
        console.log(data);
        setAccessToken(data.accessToken)
        setFirstName('');
        setLastName('');
        setEmail('');
        setPwd('');
        setMatchPwd('');
        } catch (err) {
      console.log('ERROR', err.message);
      setSuccess(false)
      setErrMessage(err.message)
    }
    
  }
  return (
    <>
      <h2 className="login-form__header">Create Account</h2>
      {
       success ? 
       <>
       <p className={errMessage ? 'errorMsg' : 'errorHide'}>{errMessage}</p>
       <form className="form login-form" onSubmit={submitHandler}>
       <Field
         type="text"
         id="firstname"
         placeholder="Enter your first name"
         labelText="First name"
         onChangeHandler={(e) => setFirstName(e.target.value)}
         val={firstName}
         valid={validFirstName}
         hintText={NAME_HINT}
       />
       <Field
         type="text"
         id="lastname"
         placeholder="Enter your last name"
         labelText="Last name"
         onChangeHandler={(e) => setLastName(e.target.value)}
         val={lastName}
         valid={validLastName}
         hintText={NAME_HINT}
       />
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
       <Field
         type="password"
         id="conf_pwd"
         placeholder="Confirm password "
         labelText="Confirm Password"
         onChangeHandler={(e) => setMatchPwd(e.target.value)}
         val={matchPwd}
         valid={validMatch}
         hintText={MATCH_HINT}
       />

       <button
         type="submit"
         disabled={disabled ? false : true}
         className="login-form__btn"
       >
         SIGN UP
       </button>
     </form> 
     <p>
        Already have an account?{" "}
        <span className="sign-btn" onClick={signinBtnHandler}>
          Sign in
        </span>
      </p>
       </>
       
     : <p>404: Error</p>
      }

      
     
    </>
  );
}



// const USER = {
//     firstName: "Jane",
//     lastName: "Doe",
//     email: "jane@mail.com",
//     password: "!123Jane"
// }

