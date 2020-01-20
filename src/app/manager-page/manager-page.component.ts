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
    console.log(this.currDesktops);
  }

  addTask(deskId: number): void {
    let taskId = this.deskService.getNextTaskIdByDesktopId();
    let newTask = new Task(taskId, 'new task');
    this.deskService.desktops.find(x => x.id == deskId).tasks.push(newTask);
    this.deskService.saveDesktops();
    this.currDesktops.find(x => x.id === deskId).tasks.push(newTask);
  }

  openTaskOverview(desk: Desktop, id: number): void {
    const dialogRef = this.dialog.open(TaskOverviewDialogComponent, {
      width: '400px',
      data: { task: this.deskService.desktops.find(x => x.id == desk.id).tasks.find(x => x.id == id) },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.deskService.saveDesktops();
    });
  }

  roundNumber(num: number): number {
    return Math.round(num);
  }
}
