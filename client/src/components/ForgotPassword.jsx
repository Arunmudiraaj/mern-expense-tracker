import React from "react";
import styles from "../styles/forgotPassword.module.scss";
import { useEffect } from "react";
import { useRef } from "react";
const ForgotPassword = (props) => {
  const emailRef = useRef();
  const url = "http://localhost:8080/password/forgotpassword";
  const closeModalHandler = (e) => {
    if (e.target.id && e.target.id === "backdrop") {
      props.toggle();
    }
  };

  const emailSendHandler = async () => {
    // const data = await axios(url);
    const email = emailRef.current.value;
    console.log(email);
  };
  return (
    <div className={styles.backdrop} id="backdrop" onClick={closeModalHandler}>
      <div className={styles.modal}>
        <div className={styles.heading}>Forgot password</div>
        <button onClick={props.toggle} className={styles.close}>
          X
        </button>
        <div className={styles.info}>
          You will receive a password <b>reset link</b> to your email to reset
          your password
        </div>
        <input type="email" placeholder="enter your email" ref={emailRef} />
        <button className={styles.sendBtn} onClick={emailSendHandler}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
