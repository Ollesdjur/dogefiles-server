import { promises } from "fs";

// Middlewares
// *** Sync Method *** //
// const importJSON = path => JSON.parse(readFileSync(path).toString());
// admin.initializeApp({
//   credential: admin.credential.cert(importJSON("serviceAccountKey.json"))
// });
// *** Sync Method Ends *** //

const loadServiceKey = async (path, admin) => {
  const data = await promises
    .readFile(path)
    .catch((err) => console.error("Failed to load service key", err));

  admin.initializeApp({
    credential: admin.credential.cert(await JSON.parse(await data.toString())),
  });
};

export default loadServiceKey;
