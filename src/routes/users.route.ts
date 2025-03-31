import express from "express"
import asyncHandler from "express-async-handler"; // essa biblioteca vai monitorar um try e catch. assim nao vou precisar colocar try catch nas minhas rotas.
import { celebrate, Segments } from "celebrate"; // celebrate schema

import { UsersController } from "../controllers/users.controller";
import { userSchema } from "../models/user.model";

export const userRoutes = express.Router();

userRoutes.get("/users", asyncHandler(UsersController.getAll));
userRoutes.get('/users/:id', asyncHandler(UsersController.getById))
userRoutes.post("/users", celebrate({ [Segments.BODY]: userSchema }), asyncHandler(UsersController.save));
userRoutes.put("/users/:id", celebrate({ [Segments.BODY]: userSchema }), asyncHandler(UsersController.update))
userRoutes.delete("/users/:id", asyncHandler(UsersController.delete))
