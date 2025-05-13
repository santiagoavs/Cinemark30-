const clientsController = {};
import clientsModel from "../models/clients.js";

clientsController.getclients = async (req, res) => {
  const clients = await clientsModel.find();
  res.json(clients);
};

clientsController.createclients = async (req, res) => {
  const { name, lastName, birthday, email, password, telephone, dui } = req.body;
  const newclients = new clientsModel({ name, lastName, birthday, email, password, telephone, dui});
  await newclients.save();
  res.json({ message: "Client saved" });
};

clientsController.deleteclients = async (req, res) => {
const deletedclients = await clientsModel.findByIdAndDelete(req.params.id);
  if (!deletedclients) {
    return res.status(404).json({ message: "Couldn't find the client" });
  }
  res.json({ message: "Client deleted" });
};

clientsController.updateclients = async (req, res) => {
  const { name, lastName, birthday, email, password, telephone, dui  } = req.body;
  await clientsModel.findByIdAndUpdate(
    req.params.id,
    {
        name, 
        lastName, 
        birthday,
         email, 
         password, 
         telephone, 
         dui 
    },
    { new: true }
  );
  res.json({ message: "client update" });
};

export default clientsController;
