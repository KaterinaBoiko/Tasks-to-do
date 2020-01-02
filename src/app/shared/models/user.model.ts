import { Desktop } from './desktop.model';
import { Manager } from './manager.model';

export class User {
    id: number;
    username: string;
    password: string;
    email: string | null;
    manager: Manager | null;
    
    constructor(id: number, username: string, password: string, email?: string, manager?: Manager){
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email || null;
        this.manager = manager || null;
        if(manager != null){
            manager.addDesktop(this.getDefaultDesktop());
        }
        if (this instanceof User)
            this.getDefaultDesktop();
        console.log(this);
    }

    getDefaultDesktop(): Desktop {
        let id = 0;
        return new Desktop(id, 'Default', this);
    }
}
