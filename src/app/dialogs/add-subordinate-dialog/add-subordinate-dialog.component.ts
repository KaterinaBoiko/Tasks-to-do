import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-subordinate-dialog',
  templateUrl: './add-subordinate-dialog.component.html',
  styleUrls: ['./add-subordinate-dialog.component.css']
})
export class AddSubordinateDialogComponent implements OnInit {

  userdIds: number[] = [];
  users: User[];
  userIdAndBoolean: [number, boolean][] = [];

  constructor(
    public dialogRef: MatDialogRef<AddSubordinateDialogComponent>,
    private userService: UserService) {
    dialogRef.beforeClose().subscribe(() => {
      this.userIdAndBoolean.forEach(x => {
        if (x[1])
          this.userdIds.push(x[0]);
      })
      dialogRef.close(this.userdIds)
    });
  }

  ngOnInit() {
    this.users = this.userService.users;
    this.users.forEach(x => this.userIdAndBoolean.push([x.id, false]));
  }

}
