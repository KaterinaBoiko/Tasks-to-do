import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialogComponent } from '../dialogs/sign-in-dialog/sign-in-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  username: string;
  password: string;

  constructor(public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private loginService: LoginService) { }

  ngOnInit() {
  }

  openDialogSignIn(): void {
    const dialogRef = this.dialog.open(SignInDialogComponent, {
      width: '400px',
      data: { username: this.username, password: this.password }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && !this.loginService.tryToSignIn(result.username, result.password))
        this.openSnackBar('Pleale, check the entered data and try again.');
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {duration: 3000});
  }
}
