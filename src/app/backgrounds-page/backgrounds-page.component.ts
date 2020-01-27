import { Component, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-backgrounds-page',
  templateUrl: './backgrounds-page.component.html',
  styleUrls: ['./backgrounds-page.component.css']
})
export class BackgroundsPageComponent implements OnInit {

  pageArray: number[];
  currentPage: number;
  pictures: string[] = [];

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.pageArray = [...Array(Math.ceil(5 / 2)).keys()].map((x, i) => i + 1);
    this.changePage(1);
    //this.currentPage = JSON.parse(localStorage.getItem('currentPage'));
    // for (let i = 0; i < 14; i++) {
    //   this.pictures.push(this.getImageUrl(i));
    // }
  }

  changePage(toPage: number): void {
    this.pictures = [];
    this.currentPage = toPage;

    let startIndex = (toPage - 1) * 6;
    for (let i = startIndex; i < startIndex + 6; i++) {
      if (i < 14)
        this.pictures.push(this.getImageUrl(i));
    }
  }

  prevPage(): void {
    if (this.currentPage != 1)
      this.changePage(--this.currentPage);
  }

  nextPage(): void {
    if (this.currentPage != this.pageArray.length)
    this.changePage(++this.currentPage);
  }

  getImageUrl(index: number): string {
    return "../../assets/images/bg_" + index + ".jpg";
  }

  changeBackground(picture: string): void {
    this.loginService.changeBackground(picture);
  }

  ifImageExist(url: string): boolean {//?
    let img = new Image();
    img.src = url;
    console.log(url + " " + img.height);
    return img.height != 0;
  }

}
