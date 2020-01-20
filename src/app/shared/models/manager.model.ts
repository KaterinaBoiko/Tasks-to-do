import { User } from './user.model';
import { Desktop } from './desktop.model';

export class Manager extends User{
    desktopsId: number[] = [];

    constructor(id: number, username: string, password: string, email: string) {
        super(id, username, password, email);
    }

}
