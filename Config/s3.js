import AWS from "aws-sdk";

const getS3 = () =>
  new AWS.S3({
    correctClockSkew: true,
    endpoint: process.env.AWS_S3_ENDPOINT,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    logger: console,
  });

export default getS3;
