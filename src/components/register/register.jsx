/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Field from "./field/field";
import "./register.scss";

const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,}$/;
const EMAL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;
const SIGNUP_URL = "http://212.24.111.61:3003/auth/signup";

const NAME_HINT =
  "At least 3 characters: start from small or capital letter, letters, numbers, dash, underscore are acceptable";
const EMAIL_HINT =
  "Start from one or more characters: small or capital letters, numbers, dot, dash, underscore, percent are acceptable. Must contain at symbol and dot symbol. At least 1 charactrer after at symbol. At least 2 characters after dot ";
const PWD_HINT =
  "At least 6 characters. Must contain at least one capital letter, one small leter, one number and one of following symbols: ! @ # $ %";
const MATCH_HINT = "Must match the password you entered previously";

export default function RegisterForm({ signinBtnHandler, signup }) {
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
            console.log("404: not found. Registration failed");
        }
        const data = await response.json();
        console.log(data);
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



const USER = {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@mail.com",
    password: "!123Jane"
}

const TOKEN = {accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJmNGY5MDZjZC05ZGRmLTQyYjUtODYxYi0yYzU5YmNmM2E5YTAiLCJzdWIiOiJqYW5lQG1haWwuY29tIiwiaWF0IjoxNjk1OTgxOTMxLjYxNywiZXhwIjoxNjk1OTg1NTMxLjYxNywicm9sZXMiOlsidXNlciJdLCJvcmlnaW5hbF91aWQiOiJmNGY5MDZjZC05ZGRmLTQyYjUtODYxYi0yYzU5YmNmM2E5YTAifQ.T-9uoshfTVpC3pJ-O2e6uTvAtbbSvYjjpum4EzD1ec0", 
refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJmNGY5MDZjZC05ZGRmLTQyYjUtODYxYi0yYzU5YmNmM2E5YTAiLCJzdWIiOiJqYW5lQG1haWwuY29tIiwiaWF0IjoxNjk1OTgxOTMxLjYxNywiZXhwIjoxNjk2NTg2NzMxLjYxNywicm9sZXMiOlsidXNlciJdLCJvcmlnaW5hbF91aWQiOiJmNGY5MDZjZC05ZGRmLTQyYjUtODYxYi0yYzU5YmNmM2E5YTAifQ.pstuxZQSx4UdCN0kT1GEbUgh_gS-gbiNiMm-uls7S-A"}