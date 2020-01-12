import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model';
import { DesktopService } from '../shared/services/desktop.service';
import { Desktop } from '../shared/models/desktop.model';
import { LoginService } from '../shared/services/login.service';
import { Task } from '../shared/models/task.model';
import { TaskOverviewDialogComponent } from '../dialogs/task-overview-dialog/task-overview-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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
    let newTask = new Task(4, 'new task');
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
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        //this.getTasksByStatus
        console.log("event.previousContainer.data[x] " + " " + JSON.stringify(event.previousContainer.data[0], null, 4));



    }
  }
}
