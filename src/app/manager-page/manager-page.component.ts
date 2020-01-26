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

  userIdBoolean: [number, boolean][] = [];
  done100: boolean = false;
  done0: boolean = false;


  constructor(public dialog: MatDialog,
    private loginService: LoginService,
    private deskService: DesktopService,
    private userService: UserService,
    private managerService: ManagerService) { }

  ngOnInit() {
    this.currManager = this.managerService.managers.find(x => x.id == this.loginService.getAuthorizedPerson().id);
    console.log(this.currManager);
    this.setCurrentDesktops();
    this.setUserIdAndBoolean();

    this.managerService.currDesktopIdsEmitter.subscribe(() => {
      this.setCurrentDesktops();
      this.setUserIdAndBoolean();
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

  getDeskOwnerByDesk(desk: Desktop): string {
    return this.userService.users.find(x => x.id == desk.userId).username;
  }

  setUserIdAndBoolean(): void {
    this.userIdBoolean = [];
    this.currDesktops.forEach(x => {
      let currUser = this.userService.users.find(u => u.id == x.userId);
      if (!this.userIdBoolean.find(q => q[0] == currUser.id))
        this.userIdBoolean.push([currUser.id, false]);
    });
    this.userIdBoolean.forEach(x => {
      console.log(x[0] + " " + this.userService.users.find(q => q.id == x[0]).username + " " + x[1]);
    });
  }

  getUsernameById(userId: number) {
    return this.userService.users.find(x => x.id == userId).username;
  }

  deleteDesk(deskId: number): void {
    let index = this.deskService.desktops.findIndex(x => x.id == deskId);
    this.deskService.desktops.splice(index, 1);
    let deskIdIndex = this.currManager.desktopsId.findIndex(x => x == deskId);
    this.currManager.desktopsId.splice(deskIdIndex, 1);
    localStorage.setItem('authorizedPerson', JSON.stringify(this.currManager));
    this.managerService.saveManagers();
    this.currDesktops = this.deskService.desktops.filter(x =>
      this.currManager.desktopsId.includes(x.id)
    );
    this.deskService.saveDesktops();
  }

  orderBy(condition: string): void {
    if (condition == 'adding') {
      this.currDesktops = this.deskService.desktops.filter(x =>
        this.currManager.desktopsId.includes(x.id)
      );
    }
    if (condition == 'downDeskname') {
      this.currDesktops.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    }
    if (condition == 'upDeskname')
      this.currDesktops.sort((a, b) => (a.name > b.name) ? -1 : ((b.name > a.name) ? 1 : 0));
    if (condition == 'downDeskOwnerName') {
      this.currDesktops.sort((a, b) => this.getDeskOwnerByDesk(a) > this.getDeskOwnerByDesk(b) ? 1 :
        this.getDeskOwnerByDesk(a) < this.getDeskOwnerByDesk(b) ? -1 : 0);
    }
    if (condition == 'upDeskOwnerName')
      this.currDesktops.sort((a, b) => this.getDeskOwnerByDesk(a) > this.getDeskOwnerByDesk(b) ? -1 :
        this.getDeskOwnerByDesk(a) < this.getDeskOwnerByDesk(b) ? 1 : 0);
    if (condition == 'toBiggerTaskAmount')
      this.currDesktops.sort((a, b) => a.tasks.length - b.tasks.length);
    if (condition == 'toSmallerTaskAmount')
      this.currDesktops.sort((a, b) => b.tasks.length - a.tasks.length);
  }

  filterDesktops() {
    this.setCurrentDesktops();
    this.currDesktops = this.currDesktops.filter(x =>
      !!this.userIdBoolean.find(q => q[0] == x.userId && q[1] == true)
    );
    if (this.userIdBoolean.every(z => !z[1])) {
      this.setCurrentDesktops();
    }
    if (this.done0) {
      this.currDesktops = this.currDesktops.filter(x => x.tasks.every(q => q.readiness == 0 || q.readiness == undefined));
    }
    if (this.done100) {
      this.currDesktops = this.currDesktops.filter(x => x.tasks.every(q => q.readiness == 100));
    }

    console.log(this.currDesktops);
  }

  setCurrentDesktops(): void {
    this.currDesktops = this.deskService.desktops.filter(x =>
      this.currManager.desktopsId.includes(x.id)
    );
  }
}
