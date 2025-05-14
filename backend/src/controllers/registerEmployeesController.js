import EmployeeModel from "../models/employee.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const registerEmployeesController = {};

registerEmployeesController.register = async (req, res) => {
  const {
    name, email, telephone, password, address, position, hireDate, salary, isActive
  } = req.body;

  try {
    const existEmployee = await EmployeeModel.findOne({ email });
    if (existEmployee) {
      return res.json({ message: "Empleado ya existe" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const newEmployee = new EmployeeModel({
      name, email, telephone, password: passwordHash, address, position, hireDate, salary, isActive
    });

    await newEmployee.save();

    jsonwebtoken.sign(
      { id: newEmployee._id },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (error, token) => {
        if (error) console.log(error);
        res.cookie("authToken", token);
        res.json({message: "Empleado registrado"})
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export default registerEmployeesController;
