import jwt from "jsonwebtoken";
import { Users } from "../models/Users";

export default {
  generateJwt(userid: number, userRoler: string, cinemaId: number) {
    let token;
    if (process.env.SECRET) {
      token = jwt.sign(
        {
          id: userid,
          cinemaId,
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
