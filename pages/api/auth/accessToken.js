import bcrypt from "bcrypt";
import Users from "../../../models/user";
import { connectDB } from "../../../utils";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../utils/generateToken";
import jwt from "jsonwebtoken";

connectDB();

export default async (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) return res.status(400).json({ err: "Hãy đăng nhập!" });

    const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
    if (!result)
      return res
        .status(400)
        .json({ err: "Your token is incorrect or expired" });

    const user = await Users.findById(result.id);
    if (!user) return res.status(400).json({ err: "User does not exists" });

    const access_token = createAccessToken({ id: user._id });
    res.json({
      access_token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    });
  } catch (error) {
    return res
        .status(500)
        .json({ err: error.message });
  }
};
