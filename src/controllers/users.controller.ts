import { NextFunction, Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore"
import { NotFoundError } from "../errors/not-found.error";
import { User } from "../models/user.model";


export class UsersController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        const snapshot = await getFirestore().collection('users').get();
        const users = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        })
        res.send(users);
    };

    static async getById(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id;
        const doc = await getFirestore().collection("users").doc(userId).get();
        if (doc.exists) {
            const user = {
                id: doc.id,
                ...doc.data()
            }
            res.send(user);
        } else {
            throw new NotFoundError("Usuário não encontrado!")
        };
    };

    static async save(req: Request, res: Response, next: NextFunction) {
        let user = req.body;
        const userSalvo = await getFirestore().collection("users").add(user)
        res.status(201).send({
            message: `Usuario ${userSalvo.id} criado com sucesso!`
        });
    };

    static async update(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const userId = id;
        const user = req.body as User;
        const docRef = getFirestore().collection("users").doc(userId);

        if ((await docRef.get()).exists) {
            await docRef.set({
                nome: user.nome,
                email: user.email,
            });
            res.send("Usuário Editado com sucesso!");
        } else {
            throw new NotFoundError("Usuário não encontrado!");
        }
    };

    static async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const userId = id;
        await getFirestore().collection("users").doc(userId).delete();
        res.status(204).end();
    };
}