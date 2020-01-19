import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `<h1>Page not found =(</h1>`,
  styles: [`h1 {background: rgba(255, 255, 255, 0.3);
    border-radius: 10px; text-align: center;}`]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
