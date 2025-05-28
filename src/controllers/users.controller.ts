import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";

export class UsersController {

    static async getAll(req: Request, res: Response, next: NextFunction) {
        res.send(await new UserService().getAll());
    };

    static async getById(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id;
        res.send(await new UserService().getById(userId))
    };

    static async save(req: Request, res: Response, next: NextFunction) {
        const userSalvo = await new UserService().save(req.body)
        res.status(201).send({
            data: userSalvo,
            message: `Usuario ${userSalvo.id} criado com sucesso!`
        })
    };

    static async update(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const userId = id;
        const user = req.body as User;
        res.send(await new UserService().update(user, userId))
    };

    static async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const userId = id;
        res.status(204).send(await new UserService().delete(userId)).end()
    };
}