import express, { Request, Response } from "express"

export const userRoutes = express.Router();

interface User {
    id: number;
    nome: string;
    email: string;
};

let id = 0;
let usuarios: User[] = [];

userRoutes.get("/users", (req: Request, res: Response) => {
    res.send(JSON.stringify(usuarios))
});

userRoutes.get('/users/:id', (req: Request, res: Response) => {
    const userId = Number(req.params.id)
    let userById = usuarios.find((user) => user.id = userId)
    res.send(JSON.stringify(userById))
})

userRoutes.post("/users", (req: Request, res: Response) => {
    let user = req.body;
    user.id = ++id;
    usuarios.push(user);
    res.send({
        message: "Usuario criado com sucesso! status: 200"
    })
});

userRoutes.put("/users/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const userUpdates = req.body;
    const userId = Number(id);
    const indexOf = usuarios.findIndex(user => user.id === userId);

    usuarios[indexOf] = {
        ...usuarios[indexOf],
        ...userUpdates,
    };
    res.send("Usuário Editado com")
})

userRoutes.delete("/users/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = Number(id);

    const userExist = usuarios.some(user => user.id === userId);

    !userExist && res.send("Usuário não existe, desculpe!")

    usuarios = usuarios.filter(user => user.id !== userId);

    res.send("Sucesso!")
})
