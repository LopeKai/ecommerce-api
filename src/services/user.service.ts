import { getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.model";
import { NotFoundError } from "../errors/not-found.error";

export class UserService {

    async getAll(): Promise<User[]> {
        const snapshot = await getFirestore().collection('users').get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as User[];
    }

    async getById(userId: string):Promise<User> {
        const doc = await getFirestore().collection("users").doc(userId).get();
        if (doc.exists) {
            const user = {
                id: doc.id,
                ...doc.data()
            } as User;
            return user;
        } else {
            throw new NotFoundError("Usuário não encontrado!")
        };
    };

    async save(bodyData: User):Promise<any> {
        const userSalvo = await getFirestore().collection("users").add(bodyData)
        return userSalvo;
    };

    async update(user: User, userId: string):Promise<string> {
        const docRef = getFirestore().collection("users").doc(userId);

        if ((await docRef.get()).exists) {
            await docRef.set({
                nome: user.nome,
                email: user.email,
            });
            return ("Usuário Editado com sucesso!");
        } else {
            throw new NotFoundError("Usuário não encontrado!");
        }
    }

    async delete(userId: string):Promise<void> {
        await getFirestore().collection("users").doc(userId).delete();
    };
}