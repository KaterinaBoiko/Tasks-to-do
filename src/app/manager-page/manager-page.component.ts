import { Component, OnInit } from '@angular/core';
import { Manager } from '../shared/models/manager.model';
import { LoginService } from '../shared/services/login.service';
import { Desktop } from '../shared/models/desktop.model';
import { DesktopService } from '../shared/services/desktop.service';
import { Status, Task } from '../shared/models/task.model';
import { MatDialog } from '@angular/material';
import { TaskOverviewDialogComponent } from '../dialogs/task-overview-dialog/task-overview-dialog.component';
import { UserService } from '../shared/services/user.service';
import { ManagerService } from '../shared/services/manager.service';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.css']
})
export class ManagerPageComponent implements OnInit {

  currManager: Manager;
  currDesktops: Desktop[] = [];
  Status: typeof Status = Status;


  constructor(public dialog: MatDialog,
    private loginService: LoginService,
    private deskService: DesktopService,
    private userService: UserService,
    private managerService: ManagerService) { }

  ngOnInit() {
    this.currManager = this.loginService.getAuthorizedPerson();
    console.log(this.currManager);
    this.currDesktops = this.deskService.desktops.filter(x =>
      this.currManager.desktopsId.includes(x.id)
    );

    this.managerService.currDesktopIdsEmitter.subscribe(() => {
      this.currDesktops = this.deskService.desktops.filter(x =>
        this.currManager.desktopsId.includes(x.id)
      );    
    });
  }

  addTask(deskId: number): void {
    let taskId = this.deskService.getNextTaskIdByDesktopId();
    let newTask = new Task(taskId, 'new task');
    this.currDesktops.find(x => x.id === deskId).tasks.push(newTask);
    this.deskService.saveDesktops();
  }

  openTaskOverview(desk: Desktop, id: number): void {
    const dialogRef = this.dialog.open(TaskOverviewDialogComponent, {
      width: '400px',
      data: { task: this.currDesktops.find(x => x.id == desk.id).tasks.find(x => x.id == id) },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(() => {
      this.deskService.saveDesktops();
    });
  }

  deleteTask(deskId: number, taskId: number): void {
    let currTasks = this.currDesktops.find(x => x.id == deskId).tasks;
    let index = currTasks.findIndex(x => x.id == taskId);
    currTasks.splice(index, 1);
    this.deskService.saveDesktops();
  }

  roundNumber(num: number): number {
    return Math.round(num);
  }

  getDeskOwnerByDesk(desk: Desktop): string{
    return this.userService.users.find(x => x.id == desk.userId).username;
  }

  deleteDesk(deskId: number): void{
    let index = this.currDesktops.findIndex(x => x.id == deskId);
    this.currDesktops.splice(index, 1);
  }
}
