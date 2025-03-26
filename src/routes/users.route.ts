import express from "express"
import { UsersController } from "../controllers/users.controller";
import asyncHandler from "express-async-handler"; // essa biblioteca vai monitorar um try e catch. assim nao vou precisar colocar try catch nas minhas rotas.

export const userRoutes = express.Router();

userRoutes.get("/users", asyncHandler(UsersController.getAll));
userRoutes.get('/users/:id', asyncHandler(UsersController.getById))
userRoutes.post("/users", asyncHandler(UsersController.save));
userRoutes.put("/users/:id", asyncHandler(UsersController.update))
userRoutes.delete("/users/:id", asyncHandler(UsersController.delete))
