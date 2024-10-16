import express from "express";
import { AccountController } from "../controllers/index.js";

const loginRouter = express.Router();

loginRouter.post("/", AccountController.loginAccount);

export default loginRouter;
