import { createConnection } from "typeorm";

createConnection({
  type: "sqlite",
  database: "./db.sqlite",
  synchronize: false,
  logging: false,
  entities: ["../models/**/*.{ts,js}"],
  migrations: ["../db/migrations/**/*.{ts,js}"],
  subscribers: ["../db/subscribers/**/*.{ts,js}"],
})
  .then(() => console.log("📖 Successfully connected with database"))
  .catch((error) => console.log("😧 error connected with database: " + error));
