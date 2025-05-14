const clientsController = {};
import clientsModel from "../models/clients.js";

clientsController.getclients = async (req, res) => {
  const clients = await clientsModel.find();
  res.json(clients);
};

clientsController.createclients = async (req, res) => {
  const { name, email, telephone, password, address, isActive } = req.body;
  const newclients = new clientsModel({ name, email, telephone, password, address, isActive});
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
  const { name, email, telephone, password, address, isActive  } = req.body;
  await clientsModel.findByIdAndUpdate(
    req.params.id,
    {
        name, email, telephone, password, address, isActive 
    },
    { new: true }
  );
  res.json({ message: "client update" });
};

export default clientsController;
