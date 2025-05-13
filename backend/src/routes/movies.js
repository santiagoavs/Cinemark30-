import express from "express";
import multer from "multer";
import moviesController from "../controllers/moviesController.js";

const router = express.Router();

const upload = multer({dest: "public/"})

router
  .route("/")
  .get(moviesController.getAllMovies)
  .post(upload.single("image"), moviesController.createMovies);

export default router;
