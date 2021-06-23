import getS3 from "../../Config/s3.js";

export default async function listObjects(req, res) {
  const s3 = getS3();

  const firebaseId = req.firebaseId;

  console.log("recieved", firebaseId);
  var params = {
    Bucket: "dogefiles-main",
  };
  s3.listObjects(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      // console.log("Success", data);
      const list = data.Contents.filter((item) =>
        item.Key.includes(firebaseId)
      );
      res.send(list);
    }
  });
}
