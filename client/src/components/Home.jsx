import React, { useEffect, useRef } from "react";
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
import BuyPremium from "./BuyPremium";
import Leaderboard from "./Leaderboard";
import axios from "axios";
const Home = () => {
  const linkRef = useRef();
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const url = "http://localhost:8080/expenses";
  const [expenses, setExpenses] = useState([]);
  const [addExpense, setAddExpense] = useState(false);
  const [buyPremium, setBuyPremium] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [downloadedUrls, setDownloadedUrls] = useState([]);
  const [showDownloadLinks, setShowDownloadLinks] = useState(false);

  const toggleModal = () => {
    setAddExpense((pre) => !pre);
  };
  const toggleBuyPremium = () => {
    setBuyPremium((pre) => !pre);
  };
  const toggleShowLeaderboard = () => {
    setShowLeaderboard((pre) => !pre);
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
      .delete(url + "/delete/" + id, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        deleteExpenseHandler(id);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };
  const downloadHandler = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/premium/download", {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res.data.fileUrl);
        linkRef.current.href = res.data.fileUrl;
        console.log(linkRef.current);
        linkRef.current.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(url + "/all", {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res.data);
        setExpenses(res.data.expenses);
        setIsPremiumUser(res.data.isPremiumUser);
        let total = 0;
        for (const item of res.data.expenses) {
          total += item.amount;
        }
        setTotalAmount(total);
      });

    // fetch number of users
    axios("http://localhost:8080/user/count").then((res) => {
      console.log(res.data.count);
      setUserCount(res.data.count);
    });
    axios("http://localhost:8080/premium/getdownloadlinks", {
      headers: { Authorization: token },
    })
      .then((res) => {
        setDownloadedUrls(res.data.allUrls);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const extractOnlyDate = (createdAt) => {
    const dateObject = new Date(createdAt);
    const datePart = dateObject.toLocaleDateString();
    return datePart;
  };
  const toggleDownload = () => {
    setShowDownloadLinks((pre) => !pre);
  };
  const downloadCardProps = isPremiumUser
    ? {
        className: styles.four,
        title: "Download Data",
        img: download,
        btn: excel,
        action: downloadHandler,
      }
    : {
        className: styles.four,
        title: "Download Data",
        img: download,
        btn: excel,
        action: toggleBuyPremium,
      };
  return (
    <div className={styles.container}>
      <a ref={linkRef} href="" style={{ display: "none" }}>
        Hidden Link
      </a>
      <div className={styles.premium}>
        {" "}
        {isPremiumUser ? (
          <div className={styles.premiumFeatures}>
            <div className={styles.premiumMsg}>You are a premium user</div>
            <button
              onClick={toggleShowLeaderboard}
              className={styles.leaderboardBtn}
            >
              Show Leaderboard
            </button>
          </div>
        ) : (
          <button onClick={toggleBuyPremium} className={styles.premiumBtn}>
            Buy Premium 👑
          </button>
        )}
      </div>
      {buyPremium && (
        <BuyPremium toggle={toggleBuyPremium} setIsPremium={setIsPremiumUser} />
      )}
      {addExpense && (
        <AddExpense toggle={toggleModal} add={addExpenseHandler} />
      )}
      {showLeaderboard && <Leaderboard toggle={toggleShowLeaderboard} />}
      <div className={styles.options}>
        <Card
          className={styles.one}
          title="Total Spendings"
          img={dollar}
          value={"💲" + totalAmount}
        />
        <Card
          action={toggleModal}
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
        <Card {...downloadCardProps} />
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

      {isPremiumUser && (
        <div className={styles.premiumDiv}>
          <button className={styles.showDownloadBtn} onClick={toggleDownload}>
            {showDownloadLinks ? "Close" : "Show Download Links"}{" "}
          </button>

          {showDownloadLinks && (
            <div>
              <h2 className={styles.listName}>--Download History--</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>File Link</th>
                  </tr>
                </thead>
                <tbody>
                  {downloadedUrls.map((item) => (
                    <tr key={item.id} className="tr">
                      <td>{extractOnlyDate(item.createdAt)}</td>
                      <td>
                        {" "}
                        <a href={item.fileUrl}>Download</a>{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
