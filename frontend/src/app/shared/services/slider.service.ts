import { Injectable } from '@angular/core';
import {SliderType} from "../../../types/slider.type";

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  private slider: SliderType[] = [
    {
      image: 'slider1.png',
      pretitle: 'Предложение месяца',
      title: 'Продвижение в Instagram для вашего бизнеса <span>-15%</span>!',
    },
    {
      image: 'slider2.png',
      pretitle: 'Акция',
      title: 'Нужен грамотный <span>копирайтер</span>?',
      description: 'Весь декабрь у нас действует акция на работу копирайтера.'
    },
    {
      image: 'slider3.png',
      pretitle: 'Новость дня',
      title: '<span>6 место</span> в ТОП-10 SMM-агенств Москвы!',
      description: 'Мы благодарим каждого, кто голосовал за нас!'
    },
  ];

  constructor() { }

  getSliders(): SliderType[] {
    return this.slider;
  }

}
