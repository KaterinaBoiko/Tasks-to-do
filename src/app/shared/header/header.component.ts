import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Desktop } from '../models/desktop.model';
import { DesktopService } from '../services/desktop.service';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currDesktops: Desktop[];
  userId: number;

  // private desktop = new Subject<any>();
  // public desktopEmitter = this.desktop.asObservable();

  // desktopEmitChange(): Observable<any> {
  //   console.log(this.desktop);
  //   return this.desktop.asObservable();
  // } 

  constructor(private loginService: LoginService,
    private deskService: DesktopService) { }

  ngOnInit() {
    this.userId = this.loginService.getAuthorizedPerson().id;
    this.currDesktops = this.deskService.desktops.filter(x => x.userId == this.userId);
  }

  changeDesktop(desktop: Desktop): void{
    this.deskService.setCurrentDesktop(desktop);
  }
}
