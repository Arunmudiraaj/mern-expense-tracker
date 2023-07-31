const Sib = require("sib-api-v3-sdk");
const { v4: uuidv4 } = require("uuid");
const ResetPassword = require("../models/resetPassword");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const sequelize = require("../util/database");
const defaultClient = Sib.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY;

const tranEmailApi = new Sib.TransactionalEmailsApi();
const sender = {
  email: "arunmudiraj18@gmail.com",
};
module.exports.forgotPassword = async (req, res) => {
  console.log("UUID", uuidv4());
  console.log("Email forgot", req.body);
  //   const toEmail = req.body.email;
  const receivers = [
    {
      ...req.body,
    },
  ];
  try {
    const uid = uuidv4();

    await req.user.createResetPassword({
      id: uid,
      isActive: true,
    });

    const result = await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Reset password - [Expense Tracker]",
      htmlContent: `<div> <p>Reset your account's password using the given link</p> <a href='http://localhost:8080/password/forgotpassword/${uid}'>Click here to reset</a> </div>`,
      //   textContent: `Hello Work PLZ Link : http://localhost:8080/password/forgotpassword/${uid}`,
    });

    console.log(result);
    res.end();
  } catch (e) {
    console.log(e);
    res.status(401).json({ error: e });
  }
};

module.exports.resetPassword = (req, res) => {
  const id = req.params.id;
  console.log("Reset id", id);
  ResetPassword.findByPk(id)
    .then((result) => {
      if (!result.isActive) {
        const htmlContent = `
            <h2> Link expired! Try generating another 'password reset link'</h2>
          `;
        res.send(htmlContent);
        return;
      }
      console.log(result);
      const htmlContent = `
        <form action='/password/change/${id}' method='POST'>
        <label for="password">New Password:</label>
        <input type="text" id="password" name="password" required>
        <input value=${result.userId} name='userId' type='hidden'/>
        <br>
        <button>Change</button>
        </form>
      `;
      res.send(htmlContent);
    })
    .catch((err) => {
      const htmlContent = `
            <h2> Invalid Link</h2>
          `;
      res.send(htmlContent);
    });
};

module.exports.changePassword = async (req, res) => {
  const txn = await sequelize.transaction();
  const resetId = req.params.resetId;
  console.log(resetId);
  const htmlContent = `<h2> Password Successfully Changed. Now Log in with your new password</h2>`;
  const { password, userId } = req.body;
  try {
    const user = await User.findByPk(userId);
    const resetPassword = await ResetPassword.findByPk(resetId);
    bcrypt.hash(password, 10, async (e, hash) => {
      await user.update({ password: hash }, { transaction: txn });
      await resetPassword.update({ isActive: false }, { transaction: txn });
      await txn.commit();
      res.send(htmlContent);
    });
  } catch (e) {
    res.status(500).json({ err: e });
  }
};
