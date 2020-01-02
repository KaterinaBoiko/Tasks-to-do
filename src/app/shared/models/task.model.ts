import { User } from './user.model';

enum Status {
    toDo,
    inProgress,
    done
}

export class Task {
    id: number;
    name: string;
    description: string;
    checklist: [boolean, string];
    user: User;
    status: Status;
    deadline: Date;
}
