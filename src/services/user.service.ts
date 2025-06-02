
import { NotFoundError } from "../errors/not-found.error";
import { User } from "../models/user.model";

import { UserRepository } from "../repositories/user.repository";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getAll(): Promise<User[]> {
        return this.userRepository.getAll();
    }

    async getById(userId: string): Promise<User> {
        const user = await this.userRepository.getById(userId);

        if(!user) throw new NotFoundError("Usuário não encontrado!")

        return user;
    };

    async save(user: User): Promise<any> {
        return this.userRepository.save(user);
    };

    async update(user: User, userId: string) {
        const _user = await this.userRepository.getById(userId);

        if(!_user) throw new NotFoundError("Usuário não encontrado!");

        _user.nome = user.nome;
        _user.email = user.email;

        this.userRepository.update(_user);
    };

    async delete(userId: string): Promise<void> {
        return this.userRepository.delete(userId);
    };
};