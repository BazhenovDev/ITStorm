import { Component, OnInit } from '@angular/core';
import {SliderType} from "../../../types/slider.type";
import {SliderService} from "../../shared/services/slider.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  sliders: SliderType[] = [];
  currentSlideIndex: number = 0;
  currentSlide: SliderType = {
    image: '',
    pretitle: '',
    title: '',
  };

  constructor(private sliderService: SliderService) { }

  ngOnInit(): void {
    this.sliders = this.sliderService.getSliders();
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
