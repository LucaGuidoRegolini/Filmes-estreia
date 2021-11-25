import { createConnection } from "typeorm";

createConnection()
  .then(() => console.log("📖 Successfully connected with database"))
  .catch((error) => console.log("😧 error connected with database: " + error));
