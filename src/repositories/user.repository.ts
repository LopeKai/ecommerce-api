import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.model";

export class UserRepository {

    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection('users')
    }

    async getAll(): Promise<User[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as User[];
    };

    async getById(userId: string): Promise<User | null> {
        const doc = await this.collection.doc(userId).get();
        if (doc.exists) {
            const user = {
                id: doc.id,
                ...doc.data()
            } as User;
            return user;
        } else {
            return null
        };
    };

    async save(bodyData: User): Promise<any> {
        const userSalvo = await this.collection.add(bodyData)
        return userSalvo;
    };

    async update(user: User) {
        const docRef = this.collection.doc(user.id);
        await docRef.set({
            nome: user.nome,
            email: user.email,
        });
    };

    async delete(userId: string): Promise<void> {
        await this.collection.doc(userId).delete();
    };
}