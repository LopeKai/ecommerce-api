import express from "express"
import { userRoutes } from "./users.route"

export const routes = (app: express.Express ) => {
    app.use(userRoutes);
}