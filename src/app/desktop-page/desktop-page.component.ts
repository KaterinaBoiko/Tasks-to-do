import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../shared/models/user.model';
import { DesktopService } from '../shared/services/desktop.service';
import { Desktop } from '../shared/models/desktop.model';
import { LoginService } from '../shared/services/login.service';
import { Task } from '../shared/models/task.model';
import { TaskOverviewDialogComponent } from '../dialogs/task-overview-dialog/task-overview-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnd } from '@angular/cdk/drag-drop';
import { ManagerService } from '../shared/services/manager.service';

@Component({
  selector: 'app-desktop-page',
  templateUrl: './desktop-page.component.html',
  styleUrls: ['./desktop-page.component.css']
})

export class DesktopPageComponent implements OnInit {

  currUser: User;
  currDesktop: Desktop;
  currTasks: Task[];
  currManagerName: string = null;

  constructor(public dialog: MatDialog,
    private deskService: DesktopService,
    private loginService: LoginService,
    private managerService: ManagerService) { }

  ngOnInit() {
    this.currUser = this.loginService.getAuthorizedPerson();
    console.log(this.currUser);

    let currDeskId = JSON.parse(localStorage.getItem('currentDesktopId'));
    this.currDesktop = this.deskService.desktops.find(x => x.id == currDeskId);
    this.currTasks = this.currDesktop.tasks;
    this.setManagerName();

    this.deskService.currDesktopEmitter.subscribe(desktop => {
      this.currDesktop = this.deskService.desktops.find(x => x.id == desktop.id);
      this.currTasks = this.currDesktop.tasks;
      this.setManagerName();
    });
  }

  openTaskOverview(id: number): void {
    const dialogRef = this.dialog.open(TaskOverviewDialogComponent, {
      width: '400px',
      data: { task: this.currDesktop.tasks.find(x => x.id == id) },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(() => {
      this.deskService.saveDesktops();
    });
  }

  getTasksByStatus(num: number): Task[] {
    return this.currTasks.filter(x => x.status == num);
  }

  addTask(statusNumber: number): void {
    let taskId = this.deskService.getNextTaskIdByDesktopId();
    let newTask = new Task(taskId, 'new task');
    newTask.status = statusNumber;
    this.currTasks.push(newTask);
    this.deskService.saveDesktops();
  }

  deleteTask(id: number): void {
    let index = this.currTasks.findIndex(x => x.id == id);
    this.currTasks.splice(index, 1);
    this.deskService.saveDesktops();
  }

  deleteDesktop() {
    let index = this.deskService.desktops.findIndex(x => x.id == this.currDesktop.id);
    this.deskService.desktops.splice(index, 1);
    this.deskService.setCurrentDesktop(
      this.deskService.getDesktopsByUserId(
        this.currUser.id)[0].id);
    this.deskService.saveDesktops();
  }

  setManagerName(): void {
    this.currManagerName = null;
    this.managerService.managers.forEach(x => {
      if (x.desktopsId.includes(this.currDesktop.id)) {
        if (x.name)
          this.currManagerName = x.name;
        else
          this.currManagerName = x.username;
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    this.currTasks.sort((a, b) => a.status - b.status);
    let currTaskId: number, prevIndex: number, newIndex: number;
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
      let newStatus = Number(event.container.id.match(/\d+/)[0])%3;
      this.currTasks.find(x => x.id == currTaskId).status = newStatus;
      prevIndex = this.currTasks.findIndex(x => x.id === currTaskId);
      newIndex = event.currentIndex;
      for (let i = 0; i < newStatus; i++) {
        newIndex += this.currTasks.filter(x => x.status === i).length;
      }
      this.currTasks.splice(newIndex, 0, this.currTasks.splice(prevIndex, 1)[0]);
    }
    this.deskService.saveDesktops();
  }


}
