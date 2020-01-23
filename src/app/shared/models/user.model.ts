export class User {
    id: number;
    username: string;
    password: string;
    email: string;
    name: string;
    surname: string;

    constructor(id: number, username: string, password: string, email: string | null) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }
}