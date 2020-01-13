import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model';
import { DesktopService } from '../shared/services/desktop.service';
import { Desktop } from '../shared/models/desktop.model';
import { LoginService } from '../shared/services/login.service';
import { Task } from '../shared/models/task.model';
import { TaskOverviewDialogComponent } from '../dialogs/task-overview-dialog/task-overview-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-desktop-page',
  templateUrl: './desktop-page.component.html',
  styleUrls: ['./desktop-page.component.css']
})

export class DesktopPageComponent implements OnInit {

  currUser: User;
  currDesktop: Desktop;
  currTasks: Task[];

  constructor(public dialog: MatDialog,
    private deskService: DesktopService,
    private loginService: LoginService) { }

  ngOnInit() {
    this.currUser = this.loginService.getAuthorizedPerson();
    console.log(this.currUser);
    this.currDesktop = this.deskService.getDesktopsByUserId(this.currUser.id)[0];
    this.currTasks = this.currDesktop.tasks;
    // this.currTasks.forEach(e => {
    //   console.log(e);
    // });
  }

  openTaskOverview(id: number): void {
    console.log(id);
    const dialogRef = this.dialog.open(TaskOverviewDialogComponent, {
      width: '400px',
      data: { task: this.currDesktop.tasks.find(x => x.id == id) }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  getTasksByStatus(num: number): Task[] {
    return this.currTasks.filter(x => x.status == num);
  }

  addTask(statusNumber: number): void {
    let taskId = this.deskService.getNextTaskIdByDesktopId(this.currDesktop.id);
    let newTask = new Task(taskId, 'new task');
    newTask.status = statusNumber;
    this.currTasks.push(newTask);
  }

  drop(event: CdkDragDrop<Task[]>) {
    // console.log("event.previousContainer " + event.previousContainer);
    // console.log("event.container " + event.container);
    // console.log("event.previousContainer.data " + " " + JSON.stringify(event.previousContainer.data, null, 4));
    // console.log("event.container.data " + " " + JSON.stringify(event.container.data, null, 4));
    // console.log("event.previousIndex " + event.previousIndex);
    // console.log("event.currentIndex " + event.currentIndex);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      let taskToMove = this.currTasks.splice(event.previousIndex, 1);
      this.currTasks.splice(event.currentIndex, 0, taskToMove[0]);

    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex)
      let currTaskId = JSON.parse(JSON.stringify(event.container.data[event.currentIndex].id));
      let newStatus = JSON.parse(JSON.stringify(Number(event.container.id.substring(event.container.id.length - 1))));
      this.currTasks.find(x => x.id == currTaskId).status = newStatus;
    }
    // console.log("event.previousContainer.data " + " " + JSON.stringify(event.previousContainer.data, null, 4));
    // console.log("event.container.data " + " " + JSON.stringify(event.container.data, null, 4));
    console.log(JSON.parse(JSON.stringify(event.container.data[event.currentIndex])));
    console.log(JSON.parse(JSON.stringify(event.container.data[event.previousIndex])));
    this.deskService.saveDesktops();
  }


}
