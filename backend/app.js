import express from "express";
import clientsRoutes from "./src/routes/clients.js";
import employeeRoutes from "./src/routes/employees.js";
import registerEmployesRoutes from "./src/routes/registerEmployees.js";
import cookieParser from "cookie-parser";
import loginRoute from "./src/routes/login.js";
import logoutRoute from "./src/routes/logout.js";
import registerClient from "./src/routes/registerClients.js";
import passwordRecoveryRoutes from "./src/routes/passwordRecovery.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/clients", clientsRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/registerEmployees", registerEmployesRoutes);
app.use("/api/login", loginRoute);
app.use("/api/logout", logoutRoute);
app.use("/api/registerClients", registerClient);
app.use("/api/passwordRecovery", passwordRecoveryRoutes);


export default app;
