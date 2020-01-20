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

  // private desktop = new Subject<any>();
  // public desktopEmitter = this.desktop.asObservable();

  // desktopEmitChange(): Observable<any> {
  //   console.log(this.desktop);
  //   return this.desktop.asObservable();
  // } 

  constructor(private loginService: LoginService,
    private deskService: DesktopService,
    private router: Router) { }

  ngOnInit() {
    this.isManager = 'desktopsId' in this.loginService.getAuthorizedPerson();
    console.log('is manager? ', this.isManager);
    let userId = this.loginService.getAuthorizedPerson().id;
    this.currDesktops = this.deskService.getDesktops().filter(x => x.userId == userId);
  }

  changeDesktop(desktop: Desktop): void{
    this.deskService.setCurrentDesktop(desktop);
  }

  logOut(): void {
    localStorage.setItem('authorizedPerson', null);
    this.router.navigateByUrl('/');
  }
}        
