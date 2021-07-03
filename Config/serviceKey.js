// import { promises } from "fs";
import CryptoJS from "crypto-js";

// Middlewares
// *** Sync Method *** //
// const importJSON = path => JSON.parse(readFileSync(path).toString());
// admin.initializeApp({
//   credential: admin.credential.cert(importJSON("serviceAccountKey.json"))
// });
// *** Sync Method Ends *** //

// const loadServiceKey = async (path, admin) => {
//   const data = await promises
//     .readFile(path)
//     .catch((err) => console.error("Failed to load service key", err));

// admin.initializeApp({
//   credential: admin.credential.cert(await JSON.parse(await data.toString())),
// });
// };

//new method
const loadServiceKey = async (key, secret, admin) => {
  const bytes = CryptoJS.AES.decrypt(key, secret);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  await admin.initializeApp({
    credential: admin.credential.cert(decryptedData),
  });
};

export default loadServiceKey;
