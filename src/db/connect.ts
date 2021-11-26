import { createConnection } from "typeorm";

import { Cinemas } from "../models/Cinemas";
import { Images } from "../models/Image";
import { Movies } from "../models/Movies";
import { Users } from "../models/Users";

createConnection({
  type: "sqlite",
  database: "./db.sqlite",
  synchronize: false,
  logging: false,
  entities: [Cinemas, Images, Movies, Users],
  migrations: ["./migrations/**/*{.ts,.js}"],
  subscribers: ["./subscribers/**/*{.ts,.js}"],
})
  .then(() => console.log("📖 Successfully connected with database"))
  .catch((error) => console.log("😧 error connected with database: " + error));
