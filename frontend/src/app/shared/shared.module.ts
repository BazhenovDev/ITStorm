import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { OwlCarouselComponent } from './owl-carousel/owl-carousel.component';
import {CarouselModule} from "ngx-owl-carousel-o";



@NgModule({
  declarations: [

    OwlCarouselComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    RouterModule
  ],
  exports: [
    OwlCarouselComponent
  ]
})
export class SharedModule { }
