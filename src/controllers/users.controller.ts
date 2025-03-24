import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore"

interface User {
    id: number;
    nome: string;
    email: string;
};

export class UsersController {
    static async getAll(req: Request, res: Response) {
        const snapshot = await getFirestore().collection('users').get();
        const users = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        })
        res.send(users)
    }

    static async getById(req: Request, res: Response) {
        const userId = req.params.id
        const doc = await getFirestore().collection("users").doc(userId).get();
        const user = {
            id: doc.id,
            ...doc.data()
        }
        res.send(user)
    }

    static async save(req: Request, res: Response) {
        let user = req.body;
        const userSalvo = await getFirestore().collection("users").add(user)
        res.send({
            message: `Usuario ${userSalvo.id} criado com sucesso! status: 200`
        })
    }

    static update(req: Request, res: Response) {
        const { id } = req.params;
        const userId = id;
        const user = req.body as User;

        getFirestore().collection("users").doc(userId).set({
            nome: user.nome,
            email: user.email,
        });

        res.send("Usuário Editado com sucesso!")
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        const userId = id;
        await getFirestore().collection("users").doc(userId).delete();
        res.send("Usuário excluido com sucesso!")
    }
}