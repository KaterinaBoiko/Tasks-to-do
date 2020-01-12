import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tasks-to-do';

  isUserSigned: boolean = true;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.userEmitter.subscribe(user => {
      if (user)
        this.isUserSigned = true;
      else
        this.isUserSigned = false;
    });
  }

}
