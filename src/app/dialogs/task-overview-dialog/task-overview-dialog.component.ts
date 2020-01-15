import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-task-overview-dialog',
  templateUrl: './task-overview-dialog.component.html',
  styleUrls: ['./task-overview-dialog.component.css']
})
export class TaskOverviewDialogComponent implements OnInit {

  task: Task;
  constructor(
    public dialogRef: MatDialogRef<TaskOverviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task }) {
    dialogRef.beforeClose().subscribe(() => dialogRef.close(this.task));
  }

  ngOnInit() {
    this.task = this.data.task;
    // console.log(this.task instanceof Task);
    // console.log(this.task);
    // console.log(this.task.deadline);
    // console.log(this.task.description);
  }

  autoGrow(e): void {
    e.target.style.height = "0px";
    e.target.style.height = e.target.scrollHeight + "px";
  }

  addItem(): void {
    this.task.checklist.push([false, "new item"]);
  }

  calcReadiness(): void {
    this.task.readiness = this.task.checklist.filter(x => x[0] == true).length * 100 / this.task.checklist.length;
  }

  deleteItem(index: number): void {
    console.log(index);
    this.task.checklist.splice(index, 1);
  }
}
