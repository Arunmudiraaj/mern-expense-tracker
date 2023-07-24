import React, { useRef, useState } from "react";
import styles from "../styles/signup.module.scss";
import lock from "../assets/lock-2-fill.svg";
import axios from "axios";

const signup = () => {
  const [auth, setAuth] = useState("signup");
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const url = "http://localhost:8080/user";
  const authChangeHandler = () => {
    setAuth((pre) => {
      if (pre === "signup") return "login";
      else return "signup";
    });
  };
  const formSubmitHandler = (e) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const pass = passwordRef.current.value;
    const confirmPass = confirmPasswordRef.current.value;
    if (!name || !email || !pass || !confirmPass) return;

    // if signup
    if (auth === "signup") {
      if (pass.length < 6) {
        alert("password length must be atleast six characters");
        return;
      }
      if (pass !== confirmPass) {
        alert("password conformation does not match");
        return;
      }
      axios
        .post(url + "/signup", {
          userName: name,
          password: pass,
          email: email,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          if (err.response.status === 500) {
            alert(
              "Email already exist. Try logging in or use a different email"
            );
            return;
          } else {
            alert("Something went wrong");
            return;
          }
        });
    } else {
      //kk
    }
  };
  return (
    <>
      <form onSubmit={formSubmitHandler} className={styles.container}>
        <img src={lock} style={{ width: "2rem" }} />
        <span className={styles.title}>
          {auth === "signup" ? "Sign Up" : "Log in"}
        </span>
        {auth === "signup" && (
          <input ref={nameRef} placeholder="Enter your name" required />
        )}
        <input ref={emailRef} type="email" placeholder="Enter email" required />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter password"
          required
        />
        {auth === "signup" && (
          <input
            ref={confirmPasswordRef}
            type="password"
            placeholder="Confirm the password"
            required
          />
        )}
        {auth === "login" && (
          <span className={styles.forgotPassword}>Forgot password</span>
        )}
        <button type="submit">{auth === "signup" ? "Sign Up" : "Login"}</button>
        <span className={styles.login}>
          {auth === "signup"
            ? "Already have an account?"
            : "Dont have an account?"}{" "}
          <span onClick={authChangeHandler}>
            {auth === "signup" ? "Login" : "Signup"}
          </span>
        </span>
      </form>
    </>
  );
};

export default signup;
