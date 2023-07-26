import React, { useEffect } from "react";
import styles from "../styles/home.module.scss";
import Card from "./Card";
import dollar from "../assets/money-dollar-circle-fill.svg";
import customers from "../assets/team-fill.svg";
import download from "../assets/file-download-line.svg";
import dollarLine from "../assets/money-dollar-circle-line.svg";
import add from "../assets/add-circle-line.svg";
import excel from "../assets/file-excel-2-line.svg";
import { useState } from "react";
import AddExpense from "./AddExpense";
import axios from "axios";
const Home = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const url = "http://localhost:8080/expenses";
  const [expenses, setExpenses] = useState([]);
  const [addExpense, setAddExpense] = useState(false);
  const toggleModal = () => {
    setAddExpense((pre) => !pre);
  };
  const addExpenseHandler = (obj) => {
    setTotalAmount((pre) => {
      let newTotal = pre;
      newTotal = newTotal + parseInt(obj.amount);
      return newTotal;
    });

    setExpenses((pre) => {
      const newData = [...pre];
      newData.push(obj);
      return newData;
    });
  };
  const deleteExpenseHandler = (id) => {
    const toBeDeleted = expenses.find((i) => i.id === id);
    setTotalAmount((pre) => {
      let newTotal = pre;
      newTotal = newTotal - toBeDeleted.amount;
      return newTotal;
    });

    setExpenses((pre) => {
      const newData = pre.filter((item) => item.id !== id);
      return newData;
    });
  };

  const deleteHandler = (id) => {
    console.log(id);
    axios
      .delete(url + "/delete/" + id)
      .then((res) => {
        deleteExpenseHandler(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios(url + "/all").then((res) => {
      console.log(res.data);
      setExpenses(res.data);
      let total = 0;
      for (const item of res.data) {
        total += item.amount;
      }
      setTotalAmount(total);
    });

    // fetch number of users
    axios("http://localhost:8080/user/count").then((res) => {
      console.log(res.data.count);
      setUserCount(res.data.count);
    });
  }, []);
  return (
    <div className={styles.container}>
      {addExpense && (
        <AddExpense toggle={toggleModal} add={addExpenseHandler} />
      )}
      <div className={styles.options}>
        <Card
          className={styles.one}
          title="Total Spendings"
          img={dollar}
          value={"💲" + totalAmount}
        />
        <Card
          open={toggleModal}
          className={styles.two}
          title="Add Expense"
          img={dollarLine}
          btn={add}
        />
        <Card
          className={styles.three}
          title="Total Customers"
          img={customers}
          value={userCount}
        />
        <Card
          className={styles.four}
          title="Download Data"
          img={download}
          btn={excel}
        />
      </div>
      {/* table */}
      <h2 className={styles.listName}>--Your Expenses List--</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((item) => (
            <tr key={item.id} className="tr">
              <td>{item.desc}</td>
              <td>💲{item.amount}</td>
              <td>{item.category}</td>
              <td>
                <button
                  className={styles.deleteBtn}
                  onClick={() => {
                    deleteHandler(item.id);
                  }}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
