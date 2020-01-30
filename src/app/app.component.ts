import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tasks-to-do';

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    document.body.classList.add('bg-img');
    if (this.loginService.getAuthorizedPerson() && this.loginService.getAuthorizedPerson().backgroundUrl) {
      let currDackgroundUrl = this.loginService.getAuthorizedPerson().backgroundUrl;
      let pictureIndex = Number(currDackgroundUrl.match(/\d+/)[0]);
      document.body.classList.add('bg_' + pictureIndex);
    }
    else
      document.body.classList.add('bg_0');

    this.loginService.backgroundEmitter.subscribe(pictureIndex => {
      let classList = document.body.classList;
      for (var i = 1; i < classList.length; i++) {
        classList.remove(classList[i]);
      }
      document.body.classList.add('bg_' + pictureIndex);
    });
  }

}
