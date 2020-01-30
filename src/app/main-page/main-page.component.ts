import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  imagesAndCaptions: [string, string][] = [];
  currImage: [string, string] = ["", ""];
  currSlide: number = 0;

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 4; i++) {
      this.imagesAndCaptions.push([this.getImageUrl(i), '']);
    }
    this.imagesAndCaptions[0][1] = "Desktop view";
    this.imagesAndCaptions[1][1] = "Manager page";
    this.imagesAndCaptions[2][1] = "To add new desktop tap this button";
    this.imagesAndCaptions[3][1] = "Change your backgrounds";

    this.showSlide(this.currSlide);
  }

  getImageUrl(index: number): string {
    return "../../assets/images/sl_" + index + ".png";
  }

  showSlide(slideIndex: number): void {
    this.currSlide = slideIndex;
    let promise = new Promise<[string, string]>((resolve) => {
      resolve(this.imagesAndCaptions[this.currSlide]);
    });
    promise.then(result => this.currImage = result);
  }

  changeSlide(index: number): void {
    this.showSlide(index);
  }

  nextSlide(num: number) {
    this.currSlide += num;
    if (this.currSlide < 0)
      this.currSlide = this.imagesAndCaptions.length - 1;
    if (this.currSlide == this.imagesAndCaptions.length)
      this.currSlide = 0;

    this.showSlide(this.currSlide);
  }
}
