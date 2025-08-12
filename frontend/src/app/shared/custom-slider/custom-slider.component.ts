import {Component, HostListener, Input, OnInit} from '@angular/core';
import {SliderType} from "../../../types/slider.type";

@Component({
  selector: 'custom-slider-component',
  templateUrl: './custom-slider.component.html',
  styleUrls: ['./custom-slider.component.scss']
})
export class CustomSliderComponent implements OnInit {

 @Input() sliders: SliderType[] = [];
  currentSlideIndex: number = 0;
  currentSlide: SliderType = {
    image: '',
    pretitle: '',
    title: '',
  };

  constructor() { }

  ngOnInit(): void {
    this.currentSlide = this.sliders[this.currentSlideIndex];
  }

  goToNextSlide(): void {
    this.currentSlideIndex++;
    if (this.currentSlideIndex === this.sliders.length) {
      this.currentSlideIndex = 0;
      this.currentSlide = this.sliders[this.currentSlideIndex];
    }
    this.currentSlide = this.sliders[this.currentSlideIndex];
  }

  goToPrevSlide(): void {
    this.currentSlideIndex--;
    if (this.currentSlideIndex < 0) {
      this.currentSlideIndex = this.sliders.length - 1;
      this.currentSlide = this.sliders[this.currentSlideIndex];
    }
    this.currentSlide = this.sliders[this.currentSlideIndex];
  }

  goToSlide(index: number): void {
    this.currentSlideIndex = index;
    this.currentSlide = this.sliders[this.currentSlideIndex];
  }

}
