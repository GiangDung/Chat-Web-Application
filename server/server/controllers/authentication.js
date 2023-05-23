import { Account } from "../schemas/accountSchema.js";
import bcrypt from "bcrypt";

//Register controller function
export async function register(req, res, next) {
  try {
    const { firstname, lastname, username, password } = req.body;
    const account = new Account();
    const hashSalt = await bcrypt.genSalt(10);
    account.username = username;
    account.password = await bcrypt.hash(password, hashSalt);
    account.name = firstname + " " + lastname;
    account.room = [];
    await account.save();
    return res.status(201).json({
      msg: `Create account successful`,
      data: account,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Failed to create account",
    });
  }
}

//Login controller function
export async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const account = await Account.findOne({ username });

    if (!account) {
      return res.status(401).json({
        msg: "Incorrect account or password.",
        data: req.body,
      });
    }

    const isValid = await bcrypt.compare(password, account.password);

    if (!isValid) {
      return res.status(401).json({
        msg: "Incorrect account or password.",
        data: req.body,
      });
    }

    return res.status(200).json({
      msg: "Login success.",
      data: account,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Server error.",
    });
  }
}
