import { Component, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-backgrounds-page',
  templateUrl: './backgrounds-page.component.html',
  styleUrls: ['./backgrounds-page.component.css']
})
export class BackgroundsPageComponent implements OnInit {

  pageArray: number[];
  currentPage: number;
  pictures: string[] = [];

  constructor(private renderer: Renderer2) { }

  private backgroundSubject: Subject<string> = new Subject();
  public backgroundEmitter = this.backgroundSubject.asObservable();

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

    let startIndex = (toPage - 1) * 6;
    for (let i = startIndex; i < startIndex + 6; i++) {
      if (this.ifImageExist(this.getImageUrl(i)))
        this.pictures.push(this.getImageUrl(i));
    }
    console.log(this.pictures);
    //this.currDesktops = this.currDesktops.slice(startIndex, startIndex + 2);
    //console.log(this.currDesktops);
  }

  getImageUrl(index: number): string {
    return "../../assets/images/bg_" + index + ".jpg";
  }

  changeBackground(picture: string): void {
    this.backgroundSubject.next(picture);
    console.log(picture);
  }

  ifImageExist(url: string): boolean {
    let img = new Image();
    img.src = url;
    console.log(url + " " + img.height);
    return img.height != 0;
  }

}
