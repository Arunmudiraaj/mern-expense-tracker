const Sib = require("sib-api-v3-sdk");

const defaultClient = Sib.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY;

const tranEmailApi = new Sib.TransactionalEmailsApi();
const sender = {
  email: "arunmudiraj18@gmail.com",
};
module.exports.forgotPassword = async (req, res) => {
  console.log("Email forgot", req.body);
  //   const toEmail = req.body.email;
  const receivers = [
    {
      ...req.body,
    },
  ];
  try {
    const result = await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "TESTING BREVO",
      textContent: `Hello Work PLZ`,
    });

    console.log(result);
    res.end();
  } catch (e) {
    console.log(e);
    res.status(401).json({ error: e });
  }
};
