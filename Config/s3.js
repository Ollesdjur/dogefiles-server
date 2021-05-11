import AWS from "aws-sdk";

export default (req, res, next) => {
  const s3 = new AWS.S3({
    correctClockSkew: true,
    endpoint: process.env.AWS_S3_ENDPOINT,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    logger: console
  });

  req.s3 = s3;
  next();
}
