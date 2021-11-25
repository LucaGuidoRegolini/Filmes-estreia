import jwt from "jsonwebtoken";
import { Users } from "../models/Users";

export default {
  generateJwt(userid: number, userRoler: string) {
    let token;
    if (process.env.SECRET) {
      token = jwt.sign(
        {
          id: userid,
          role: userRoler,
        },
        process.env.SECRET,
        {
          expiresIn: "10d",
        }
      );
    }
    return token;
  },
};
