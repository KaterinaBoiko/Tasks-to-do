import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Desktop } from '../models/desktop.model';
import { DesktopService } from '../services/desktop.service';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currDesktops: Desktop[];
  isManager: boolean;

  constructor(private loginService: LoginService,
    private deskService: DesktopService,
    private router: Router) { }

  ngOnInit() {
    this.isManager = 'desktopsId' in this.loginService.getAuthorizedPerson();
    let userId = this.loginService.getAuthorizedPerson().id;
    this.currDesktops = this.deskService.desktops.filter(x => x.userId == userId);
  }

  changeDesktop(desktopId: number): void{
    this.deskService.setCurrentDesktop(desktopId);
  }

  addNewDesktop(): void{
    let newId = this.deskService.getNextDesktopId();
    this.deskService.addDesktop(new Desktop(newId, "New desktop", this.loginService.getAuthorizedPerson().id));
    this.changeDesktop(newId);
  }

  logOut(): void {
    localStorage.setItem('authorizedPerson', null);
    this.router.navigateByUrl('/');
  }
}        
