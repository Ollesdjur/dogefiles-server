import { DOGEFILES_MAIN, DOGEFILES_MAIN_DEV } from "./s3.constants.js";
export default async function hello(req, res) {
  console.log(process.env.NODE_ENV);
  console.log(
    process.env.NODE_ENV === "development" ? DOGEFILES_MAIN_DEV : DOGEFILES_MAIN
  );
  return res.status(200).json("s3 test done");
}
