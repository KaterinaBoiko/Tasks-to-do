import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tasks-to-do';

  constructor() { }

  ngOnInit() {
    document.body.classList.add('bg-img'); 
    document.body.classList.add('bg_2'); 
  }

}
