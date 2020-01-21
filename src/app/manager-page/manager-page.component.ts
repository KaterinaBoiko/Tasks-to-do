import { Component, OnInit } from '@angular/core';
import { Manager } from '../shared/models/manager.model';
import { LoginService } from '../shared/services/login.service';
import { Desktop } from '../shared/models/desktop.model';
import { DesktopService } from '../shared/services/desktop.service';
import { Status, Task } from '../shared/models/task.model';
import { MatDialog } from '@angular/material';
import { TaskOverviewDialogComponent } from '../dialogs/task-overview-dialog/task-overview-dialog.component';

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
    private deskService: DesktopService) { }

  ngOnInit() {
    this.currManager = this.loginService.getAuthorizedPerson();
    console.log(this.currManager);
    this.currDesktops = this.deskService.desktops.filter(x =>
      this.currManager.desktopsId.includes(x.id)
    );
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
}
