import mongoose from "mongoose";
import { config } from "./src/config.js";

// 1- Configuro la URI o dirección de la base de datos
//const URI = "";

// 2- Conecto la base de datos
mongoose.connect(config.db.URI);

// ------ Comprobar que todo funciona ------

// 3- Creo una constante que es igual a la conexión
const connection = mongoose.connection;

// Veo si funciona
connection.once("open", () => {
  console.log("DB is connected");
});

// Veo si se desconectó
connection.on("disconnected", () => {
  console.log("DB is disconnected");
});

// Veo si hay un error
connection.on("error", (error) => {
  console.log("error found" + error);
});
