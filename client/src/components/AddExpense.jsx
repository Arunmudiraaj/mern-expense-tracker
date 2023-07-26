import React, { useRef } from "react";
import styles from "../styles/addExpense.module.scss";
import axios from "axios";
const AddExpense = (props) => {
  const descRef = useRef();
  const amountRef = useRef();
  const dateRef = useRef();
  const categoryRef = useRef();
  const closeModalHandler = (e) => {
    if (e.target.id && e.target.id === "backdrop") {
      props.toggle();
    }
  };
  const addExpenseHandler = (e) => {
    e.preventDefault();
    const desc = descRef.current.value;
    const amount = amountRef.current.value;
    const category = categoryRef.current.value;
    const date = dateRef.current.value;
    if (!desc || !amount || !category || !date) return;
    console.log(desc, amount, category, date);
    axios
      .post("http://localhost:8080/expenses/add", {
        desc: desc,
        amount: amount,
        date: date,
        category,
      })
      .then((res) => {
        console.log(res);
        props.add(res.data);
        props.toggle();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.backdrop} id="backdrop" onClick={closeModalHandler}>
      <div className={styles.modal}>
        <div className={styles.heading}>Add Expense</div>
        <button onClick={props.toggle} className={styles.close}>
          X
        </button>
        <form>
          <input
            placeholder="Enter Expense Description"
            required
            ref={descRef}
          />
          <input
            placeholder="Enter Expense Amount"
            required
            type="number"
            ref={amountRef}
          />
          <select ref={categoryRef}>
            <option>Food</option>
            <option>Clothing</option>
            <option>Entertainment</option>
            <option>Utility bills</option>
            <option>Education</option>
            <option>Grocessary</option>
          </select>
          <input type="date" required ref={dateRef} />
          <button className={styles.addBtn} onClick={addExpenseHandler}>
            ADD
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
