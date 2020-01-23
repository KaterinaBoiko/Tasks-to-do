import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Desktop } from '../models/desktop.model';
import { DesktopService } from '../services/desktop.service';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AddSubordinateDialogComponent } from 'src/app/dialogs/add-subordinate-dialog/add-subordinate-dialog.component';
import { ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currDesktops: Desktop[];
  isManager: boolean;

  constructor(public dialog: MatDialog,
    private loginService: LoginService,
    private deskService: DesktopService,
    private managerService: ManagerService,
    private router: Router) { }

  ngOnInit() {
    this.isManager = 'desktopsId' in this.loginService.getAuthorizedPerson();
    let userId = this.loginService.getAuthorizedPerson().id;
    this.currDesktops = this.deskService.desktops.filter(x => x.userId == userId);

    this.deskService.currDesktopEmitter.subscribe(() => {
      this.currDesktops = this.deskService.desktops.filter(x => x.userId == userId);
    });
  }

  changeDesktop(desktopId: number): void {
    this.deskService.setCurrentDesktop(desktopId);
  }

  addNewDesktop(): void {
    let newId = this.deskService.getNextDesktopId();
    this.deskService.addDesktop(new Desktop(newId, "New desktop", this.loginService.getAuthorizedPerson().id));
    this.changeDesktop(newId);
  }

  addSubordinate(): void {
    const dialogRef = this.dialog.open(AddSubordinateDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.managerService.addSubordinates(result, this.loginService.getAuthorizedPerson());
    });
  }

  logOut(): void {
    localStorage.setItem('authorizedPerson', null);
    this.router.navigateByUrl('/');
  }
}        
