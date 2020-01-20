export enum Status {
    ToDo,
    InProgress,
    Done
}

export class Task {
    id: number;
    name: string;
    description: string | null;
    checklist: [boolean, string][] | null;
    readiness: number;
    status: Status;
    deadline: Date | null;

    constructor(id: number, name: string){
        this.id = id;
        this.name = name;
        this.status = Status.ToDo;
        this.checklist = [];
    }

    changeName(newName: string): void {
        this.name = newName;
    }

    changeDescription(newDescription: string): void {
        this.description = newDescription;
    }

    addToChecklist(name: string): void {
        this.checklist.push([false, name]);
    }

    getStatusValue(key: number): string{
        return Status[key];
    }
    //another methods to change task
}
