import { User } from './user.model';
import { Desktop } from './desktop.model';

export class Manager extends User{
    desktops: Desktop[] = [];

    constructor(id: number, username: string, password: string, email: string) {
        super(id, username, password, email);
    }

    addSubordinatesDesktop(userId: number): void {
        this.desktops.push(new Desktop(0, 'Default', userId));//???? desktop id
    }
}
