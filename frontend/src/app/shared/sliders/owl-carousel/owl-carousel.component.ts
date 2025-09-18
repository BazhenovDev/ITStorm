import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {OwlOptions, CarouselComponent} from "ngx-owl-carousel-o";
import {SliderType} from "../../../../types/slider.type";
import {ModalService} from "../../services/modal.service";
import {ModalConstants} from "../../../../constants/modal.constants";

@Component({
  selector: 'owl-carousel-component',
  templateUrl: './owl-carousel.component.html',
  styleUrls: ['./owl-carousel.component.scss']
})
export class OwlCarouselComponent implements OnInit {

  @Input() sliders: SliderType[] = [];
  @Output() selectType: EventEmitter<string> = new EventEmitter<string>();
  modalType: string = ModalConstants.order;
  currentSlideIndex: number = 0;

  @ViewChild('owlCar') owlCar!: CarouselComponent;

  constructor(private modalService: ModalService,) { }

  ngOnInit(): void {
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false
  }

  setCurrentIndex(event: any) {
    this.currentSlideIndex = event.startPosition;
  }

  setModalType(): void {
    this.modalService.setModalType(this.modalType);
    this.selectType.emit(this.sliders[this.currentSlideIndex].type);
  }

}
