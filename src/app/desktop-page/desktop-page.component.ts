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
    let currTaskId: number, prevIndex: number, newIndex : number;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      currTaskId = JSON.parse(JSON.stringify(event.container.data[event.currentIndex].id));
      prevIndex = this.currTasks.findIndex(x => x.id === currTaskId);
      newIndex = prevIndex - event.previousIndex + event.currentIndex;
      this.currTasks.splice(newIndex, 0, this.currTasks.splice(prevIndex, 1)[0]);
    }
    else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex)
      currTaskId = JSON.parse(JSON.stringify(event.container.data[event.currentIndex].id));
      let newStatus = JSON.parse(JSON.stringify(Number(event.container.id.substring(event.container.id.length - 1))));
      this.currTasks.find(x => x.id == currTaskId).status = newStatus;
      prevIndex = this.currTasks.findIndex(x => x.id === currTaskId);
      newIndex = event.currentIndex;
      for(let i = 0; i < newStatus; i++){
        newIndex += this.currTasks.filter(x => x.status === i).length;
      }
      this.currTasks.splice(newIndex, 0, this.currTasks.splice(prevIndex, 1)[0]);
    }
    this.deskService.saveDesktops();
  }


}
