import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SliderType} from "../../../../types/slider.type";
import {ModalService} from "../../services/modal.service";
import {ModalConstants} from "../../../../constants/modal.constants";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'custom-slider-component',
  templateUrl: './custom-slider.component.html',
  styleUrls: ['./custom-slider.component.scss'],
  animations: [
    trigger('fadeSlide', [
      state('show', style({opacity: 1})),
      state('hide', style({opacity: 0.3})),
      transition('* <=> *', animate('300ms linear')),
    ])
  ]
})
export class CustomSliderComponent implements OnInit, OnDestroy {

  @Input() sliders: SliderType[] = [];
  @Output() selectType: EventEmitter<string> = new EventEmitter<string>();
  currentSlideIndex: number = 0;
  interval: number = 0;
  toggleFadeSlide: string = 'show';
  currentSlide: SliderType = {
    image: '',
    pretitle: '',
    title: '',
    type: ''
  };

  modalType: string = ModalConstants.order;

  constructor(private modalService: ModalService,) {
  }

  ngOnInit(): void {
    if (this.sliders.length > 0) {
      this.currentSlide = this.sliders[this.currentSlideIndex];
      this.startInterval();
    }
  }

  goToNextSlide(): void {
    this.toggleFadeSlide = 'hide'
    clearInterval(this.interval);
    setTimeout(() => {
      this.currentSlideIndex++;
      if (this.currentSlideIndex === this.sliders.length) {
        this.currentSlideIndex = 0;
        this.currentSlide = this.sliders[this.currentSlideIndex];
      }
      this.currentSlide = this.sliders[this.currentSlideIndex];

      this.startInterval();
    }, 300)
  }

  goToPrevSlide(): void {
    this.toggleFadeSlide = 'hide'
    clearInterval(this.interval);
    setTimeout(() => {
      this.currentSlideIndex--;
      if (this.currentSlideIndex < 0) {
        this.currentSlideIndex = this.sliders.length - 1;
        this.currentSlide = this.sliders[this.currentSlideIndex];
      }
      this.currentSlide = this.sliders[this.currentSlideIndex];
      this.startInterval();
    },300)
  }

  goToSlide(index: number): void {
    this.toggleFadeSlide = 'hide'
    clearInterval(this.interval);
    setTimeout(() => {
      this.currentSlideIndex = index;
      this.currentSlide = this.sliders[this.currentSlideIndex];
      this.startInterval();
    }, 300)
  }

  setModalType(): void {
    this.modalService.setModalType(this.modalType);
    this.selectType.emit(this.currentSlide.type);
  }

  private startInterval(): void {
    this.interval = window.setInterval(() => {
      this.goToNextSlide();
    }, 5000)
  }

  onAnimationEnd(): void {
    this.toggleFadeSlide = 'show';
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

}
