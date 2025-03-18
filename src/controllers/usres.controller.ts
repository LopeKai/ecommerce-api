import { Request, Response } from "express";

interface User {
    id: number;
    nome: string;
    email: string;
};

let id = 0;
let usuarios: User[] = [];

export class UsersController {
    static getAll(req: Request, res: Response) {
        res.send(usuarios)
    }

    static getById(req: Request, res: Response) {
        const userId = Number(req.params.id)
        let userById = usuarios.find((user) => user.id === userId)
        res.send(userById)
    }

    static save(req: Request, res: Response) {
        let user = req.body;
        user.id = ++id;
        usuarios.push(user);
        res.send({
            message: "Usuario criado com sucesso! status: 200"
        })
    }

    static update(req: Request, res: Response) {
        const { id } = req.params;
        const userUpdates = req.body;
        const userId = Number(id);
        const indexOf = usuarios.findIndex(user => user.id === userId);

        usuarios[indexOf] = {
            ...usuarios[indexOf],
            ...userUpdates,
        };
        res.send("Usuário Editado com")
    }

    static delete(req: Request, res: Response) {
        const { id } = req.params;
        const userId = Number(id);

        const userExist = usuarios.some(user => user.id === userId);

        !userExist && res.send("Usuário não existe, desculpe!")

        usuarios = usuarios.filter(user => user.id !== userId);

        res.send("Sucesso!")
    }
}