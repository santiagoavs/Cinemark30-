import jsonwebtoken from "jsonwebtoken"; 
import bcryptjs from "bcryptjs"; 
import nodemailer from "nodemailer";
import crypto from "crypto"; 
import clientsModel from "../models/clients.js";
import { config } from "../config.js";

const registerClientsController = {};

registerClientsController.register = async (req, res) => {
  const {
    name, email, telephone, password, address, isActive
  } = req.body;

  try {
    const existingClient = await clientsModel.findOne({ email });
    if (existingClient) {
      return res.json({ message: "Client already exist" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const newClient = new clientsModel({
      name, email, telephone, password: passwordHash, address, isActive: isActive || false,
    });

    await newClient.save();

    const verificationCode = crypto.randomBytes(3).toString("hex");

    const tokenCode = jsonwebtoken.sign(
      { email, verificationCode },
      config.JWT.secret,
      { expiresIn: "2h" }
    );

    res.cookie("verificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.email_user,
        pass: config.email.email_pass,
      },
    });

    const mailOptions = {
      from: config.email.email_user,
      to: email,
      subject: "Verificación de correo",
      text:
        "Para verificar tu cuenta, utiliza el siguiente codigo: " +
        verificationCode +
        "\n expira en dos horas",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.json({ message: "Error sending email" + error });
      }
      console.log("Email sent" + info);
    });

    res.json({
      message: "Client registered, Please verify your email with the code sent",
    });
  } catch (error) {
    console.log("error" + error);
  }
};

registerClientsController.verifyCodeEmail = async (req, res) => {
  const { requireCode } = req.body;

  const token = req.cookies.verificationToken;

  try {
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const { email, verificationCode: storedCode } = decoded;

    if (requireCode !== storedCode) {
      return res.json({ message: "Invalid code" });
    }

    const client = await clientsModel.findOne({ email });
    client.isActive = true;
    await client.save();

    res.clearCookie("verificationToken");

    res.json({ message: "Email Active Successfuly" });
  } catch (error) {
    console.log("error" + error);
  }
};

export default registerClientsController;
