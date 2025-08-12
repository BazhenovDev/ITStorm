import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { OwlCarouselComponent } from './owl-carousel/owl-carousel.component';
import {CarouselModule} from "ngx-owl-carousel-o";
import { CustomSliderComponent } from './custom-slider/custom-slider.component';



@NgModule({
  declarations: [
    OwlCarouselComponent,
    CustomSliderComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    RouterModule
  ],
  exports: [
    OwlCarouselComponent,
    CustomSliderComponent
  ]
})
export class SharedModule { }
