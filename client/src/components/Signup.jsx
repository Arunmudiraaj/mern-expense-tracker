import React, { useRef, useState } from "react";
import styles from "../styles/signup.module.scss";
import lock from "../assets/lock-2-fill.svg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const signup = () => {
  const navigate = useNavigate();
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
  const handleShowToastError = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const pass = passwordRef.current.value;

    if (!email || !pass) return;
    // if signup
    if (auth === "signup") {
      const name = nameRef.current.value;
      const confirmPass = confirmPasswordRef.current.value;
      if (!name || !email || !pass || !confirmPass) return;
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
          toast.success("Account created! Log in to continue", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
          setAuth("login");
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 500) {
            console.log(err.response);
            handleShowToastError(
              "Email already exist. Try logging in or use a different email"
            );
            return;
          } else {
            handleShowToastError("Something went wrong");
            return;
          }
        });
    } else {
      //k
      console.log(email, pass);
      axios
        .post("http://localhost:8080/user/authentication", {
          email: email,
          password: pass,
        })
        .then((res) => {
          console.log(res);
          // handleShowToastError(res.data.message);
          navigate("/");
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.data);
          handleShowToastError(err.response.data.message);
        });
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
        <ToastContainer />
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
