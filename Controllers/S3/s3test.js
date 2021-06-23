import { DOGEFILES_MAIN } from "./index.js";
export default async function hello(req, res) {
  console.log("Imported Constant: ", DOGEFILES_MAIN);
  return res.status(200).json("s3 test done");
}
