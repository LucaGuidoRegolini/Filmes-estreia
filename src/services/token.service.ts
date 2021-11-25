import jwt from "jsonwebtoken";
import { Users } from "../models/Users";

export default {
  generateJwt(user: Users) {
    let token;
    if (process.env.SECRET) {
      token = jwt.sign(
        {
          id: user.id,
          role: user.role,
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
