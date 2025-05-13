import jsonwebtoken from "jsonwebtoken"; 
import bcryptjs from "bcryptjs"; 
import clientsModel from "../models/clients.js";
import employeeModel from "../models/employee.js";
import { config } from "../config.js";
import { sendMail, HTMLRecoveryEmail } from "../utils/MailPasswordRecovery.js";

const passwordRecoveryController = {};

passwordRecoveryController.requestCode = async (req, res) => {
  const { email } = req.body;

  try {
    let userFound;
    let userType;

    userFound = await clientsModel.findOne({ email });
    if (userFound) {
      userType = "client";
    } else {
      userFound = await employeeModel.findOne({ email });
      if (userFound) {
        userType = "employee";
      }
    }

    if (!userFound) {
      return res.json({ message: "User not found" });
    }

    const code = Math.floor(10000 + Math.random() * 90000).toString();

    const token = jsonwebtoken.sign(
      { email, code, userType, verfied: false },
      config.JWT.secret,
      { expiresIn: "20m" }
    );

    res.cookie("tokenRecoveryCode", token, { maxAge: 20 * 60 * 1000 });

    await sendMail(
      email,
      "Password recovery code",
      `Your verification code is: ${code}`,
      HTMLRecoveryEmail(code)
    );

    res.json({ message: "Verification code send" });
  } catch (error) {}
};

passwordRecoveryController.verifyCode = async (req, res) => {
  const { code } = req.body;

  try {
    const token = req.cookies.tokenRecoveryCode;
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    if (decoded.code !== code) {
      return res.json({ message: "Invalid Code" });
    }

    const newToken = jsonwebtoken.sign(
      {
        email: decoded.email,
        code: decoded.code,
        userType: decoded.userType,
        verified: true,
      },
      config.JWT.secret,
      { expiresIn: "20m" }
    );
    res.cookie("tokenRecoveryCode", newToken, { maxAge: 20 * 60 * 1000 });

    res.json({ message: "Code verified successfully" });
  } catch (error) {
    console.log("error" + error);
  }
};

passwordRecoveryController.newPassword = async (req, res) => {
  const { newPassword } = req.body;

  try {
    const token = req.cookies.tokenRecoveryCode;

    if (!token) {
      return res.json({ message: "Not token provided" });
    }

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    if (!decoded.verified) {
      return res.json({ message: "Code not verified, cannot reset password" });
    }

    const { email, userType } = decoded;

    let user;

    if (userType === "client") {
      user = await clientsModel.findOne({ email });
    } else if (userType === "employee") {
      user = await employeeModel.findOne({ email });
    }

    const hashPassword = await bcryptjs.hash(newPassword, 10);

    let updatedUser;
    if (userType === "client") {
      updatedUser = await clientsModel.findOneAndUpdate(
        { email },
        { password: hashPassword },
        { new: true }
      );
    } else if (userType === "employee") {
      updatedUser = await employeeModel.findOneAndUpdate(
        { email },
        { password: hashPassword },
        { new: true }
      );
    }

    res.clearCookie("tokenRecoveryCode");

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.log("error" + error);
  }
};

export default passwordRecoveryController;
