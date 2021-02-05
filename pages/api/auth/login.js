import bcrypt from "bcrypt";
import Users from "../../../models/user";
import { connectDB } from "../../../utils";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../utils/generateToken";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await login(req, res);
      break;

    default:
      break;
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) return res.json({ err: "Không tìm thấy tài khoản người dùng." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ err: "Mật khẩu không đúng. Mời nhập lại." });

    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });

    res.status(200).json({
      msg: "Login Success",
      access_token,
      refresh_token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
