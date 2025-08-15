import {Injectable} from '@angular/core';
import {ServicesType} from "../../../types/services.type";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private services: ServicesType[] = [
    {
      image: 'service1.png',
      title: 'Создание сайтов',
      description: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
      price: 7500,
      type: 'development',
    },
    {
      image: 'service2.png',
      title: 'Продвижение',
      description: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
      price: 3500,
      type: 'seo',
    },
    {
      image: 'service3.png',
      title: 'Реклама',
      description: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
      price: 1000,
      type: 'promotion',
    },
    {
      image: 'service4.png',
      title: 'Копирайтинг',
      description: 'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
      price: 750,
      type: 'copywriting',
    },
  ]

  constructor() {
  }

  public getServices(): ServicesType[] {
    return this.services;
  }
}
