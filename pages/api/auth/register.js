import { connectDB, valid } from "../../../utils";
import Users from "../../../models/user";
import bcrypt from "bcrypt";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;

    default:
      break;
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, cf_password } = req.body;

    const errMsg = valid(name, email, password, cf_password);
    if (errMsg) return res.status(400).json({ err: errMsg });

    const user = await Users.findOne({ email });
    if (user) return res.status(400).json({ err: "Email already exists" });

    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = await Users.create({
      name,
      email,
      password: passwordHash,
      cf_password,
    });

    res.status(201).json({ msg: "Register Success", data: newUser });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
