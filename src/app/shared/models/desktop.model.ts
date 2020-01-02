import { User } from './user.model';
import { Task } from './task.model';

export class Desktop {
    id: number;
    name: string;
    userId: number;
    tasks: Task[];

    constructor(id: number, name: string, user: User){
        this.id = id;
        this.name = name;
        this.userId = user.id;
    }

    addTask(task: Task): void{
        this.tasks.push(task);
    }
}
