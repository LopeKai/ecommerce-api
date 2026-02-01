import { error } from "console";
import { User } from "../models/user.model";
import { getAuth, UserRecord } from "firebase-admin/auth";
import { EmailAlreadyExistsError } from "../errors/email-alredy-exists.error";

export class AuthService {
    create(user: User): Promise<UserRecord> {
        return getAuth().createUser({
            email: user.email,
            password: user.password,
            displayName: user.nome,
        }).catch(err => {
            if(err.code == "auth/email-already-exists") {
                throw new EmailAlreadyExistsError();
            }
            throw err;
        }) ;
    }
};