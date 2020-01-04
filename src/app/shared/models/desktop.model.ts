import { Task } from './task.model';

export class Desktop {
    id: number;
    name: string;
    userId: number;
    tasks: Task[] = [];

    constructor(id: number, name: string, userId: number){
        this.id = id;
        this.name = name;
        this.userId = userId;
    }

    addTask(task: Task): void{
        this.tasks.push(task);
    }
}
