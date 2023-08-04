const AWS = require("aws-sdk");

function uploadToS3(data, filename) {
  const BUCKET_NAME = process.env.BUCKET_NAME;
  const IAM_USER_KEY = process.env.IAM_USER_KEY;
  const IAM_USER_SECRET = process.env.IAM_USER_SECRET;
  let s3Bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
  });
  return new Promise((resolve, reject) => {
    let params = {
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: data,
      ACL: "public-read",
    };
    s3Bucket.upload(params, (err, s3response) => {
      if (err) {
        reject("Something went wrong");
      } else {
        resolve(s3response.Location);
      }
    });
  });
}

module.exports = {
  uploadToS3,
};
