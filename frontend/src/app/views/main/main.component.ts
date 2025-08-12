import { Component, OnInit } from '@angular/core';
import {SliderType} from "../../../types/slider.type";
import {SliderService} from "../../shared/services/slider.service";
import {flush} from "@angular/core/testing";

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  sliders: SliderType[] = [];

  showCustomSlider: boolean = true;

  constructor(private sliderService: SliderService) { }

  ngOnInit(): void {
    this.sliders = this.sliderService.getSliders();
  }
}
