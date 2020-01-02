import { User } from './user.model';
import { Desktop } from './desktop.model';

export class Manager extends User{
    desktops: Desktop[];

    constructor(id: number, username: string, password: string, email?: string) {
        super(id, username, password, email);
    }

    addDesktop(desktop: Desktop): void{
        this.desktops.push(desktop);
    }
}
