const employeeController = {};
import employeeModel from "../models/employee.js";

employeeController.getemployee = async (req, res) => {
  const employee = await employeeModel.find();
  res.json(employee);
};

employeeController.createemployee = async (req, res) => {
  const { name, email, telephone, password, address, position, hireDate, salary, isActive } = req.body;
  const newemployee= new employeeModel({ name, email, telephone, password, address, position, hireDate, salary, isActive });
  await newemployee.save();
  res.json({ message: "employee saved" });
};

employeeController.deleteemployee = async (req, res) => {
const deletedemployee = await employeeModel.findByIdAndDelete(req.params.id);
  if (!deletedemployee) {
    return res.status(404).json({ message: "Couldn't find the employee" });
  }
  res.json({ message: "employee deleted" });
};

employeeController.updateemployee = async (req, res) => {
  const { name, email, telephone, password, address, position, hireDate, salary, isActive  } = req.body;
  await employeeModel.findByIdAndUpdate(
    req.params.id,
    {
        name, email, telephone, password, address, position, hireDate, salary, isActive  
    },
    { new: true }
  );
  res.json({ message: "employee updated" });
};

export default employeeController;
