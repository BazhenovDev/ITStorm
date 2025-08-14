import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { OwlCarouselComponent } from './owl-carousel/owl-carousel.component';
import {CarouselModule} from "ngx-owl-carousel-o";
import { CustomSliderComponent } from './custom-slider/custom-slider.component';
import {HttpClientModule} from "@angular/common/http";
import { MinLengthPipe } from './pipes/min-length.pipe';
import {CheckRegExpPipe} from "./pipes/check-regexp.pipe";



@NgModule({
  declarations: [
    OwlCarouselComponent,
    CustomSliderComponent,
    CheckRegExpPipe,
    MinLengthPipe,
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
    MinLengthPipe
  ]
})
export class SharedModule { }
