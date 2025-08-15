import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { OwlCarouselComponent } from './sliders/owl-carousel/owl-carousel.component';
import {CarouselModule} from "ngx-owl-carousel-o";
import { CustomSliderComponent } from './sliders/custom-slider/custom-slider.component';
import {HttpClientModule} from "@angular/common/http";
import { MinLengthPipe } from './pipes/min-length.pipe';
import {CheckRegExpPipe} from "./pipes/check-regexp.pipe";
import { CardInfoComponent } from './card-info/card-info.component';



@NgModule({
  declarations: [
    OwlCarouselComponent,
    CustomSliderComponent,
    CheckRegExpPipe,
    MinLengthPipe,
    CardInfoComponent,
  ],
  imports: [
    CommonModule,
    CarouselModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    OwlCarouselComponent,
    CustomSliderComponent,
    CheckRegExpPipe,
    MinLengthPipe,
    CardInfoComponent
  ]
})
export class SharedModule { }
