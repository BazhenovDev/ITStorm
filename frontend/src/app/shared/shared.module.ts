import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { CustomSliderComponent } from './custom-slider/custom-slider.component';



@NgModule({
  declarations: [

    CustomSliderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CustomSliderComponent
  ]
})
export class SharedModule { }
