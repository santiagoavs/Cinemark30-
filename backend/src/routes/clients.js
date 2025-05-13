import express from "express";
import clientsController from "../controllers/clientsController.js";
const router = express.Router();

router
  .route("/")
  .get(clientsController.getclients)
  .post(clientsController.createclients);

router
  .route("/:id")
  .put(clientsController.updateclients)
  .delete(clientsController.deleteclients);

export default router;
