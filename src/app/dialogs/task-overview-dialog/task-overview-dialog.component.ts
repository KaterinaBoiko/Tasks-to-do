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
    @Inject(MAT_DIALOG_DATA) public data: {task: Task}
  ) { }

  ngOnInit() {
    this.task = this.data.task;
    console.log(this.task instanceof Task);
    console.log(this.task);
    console.log(this.task.deadline);
  }

}
