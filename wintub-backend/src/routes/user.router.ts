import express from "express";
import { logIn, getAllUsers, adduser } from "../controllers/user.controller";
import { middlerwareUser } from "../middleware";

const routes = express.Router();

routes.get("/", getAllUsers);
routes.post("/login", logIn);
routes.post("/add", middlerwareUser, adduser);

export default routes;
