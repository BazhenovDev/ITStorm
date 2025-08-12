import { Component, OnInit } from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";

@Component({
  selector: 'owl-carousel-component',
  templateUrl: './owl-carousel.component.html',
  styleUrls: ['./owl-carousel.component.scss']
})
export class OwlCarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false
  }



}
