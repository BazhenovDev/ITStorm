import {Injectable} from '@angular/core';
import {SliderType} from "../../../types/slider.type";
import {ReviewType} from "../../../types/review.type";

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  private mainSlider: SliderType[] = [
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

  private reviewsSlider: ReviewType[] = [
    {
      image: 'review1.jpg',
      name: 'Станислав',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.'
    },
    {
      image: 'review2.jpg',
      name: 'Алёна',
      text: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.'
    },
    {
      image: 'review3.jpg',
      name: 'Мария',
      text: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!'
    },
    {
      image: 'review4.jpg',
      name: 'Екатерина',
      text: 'АйтиШторм помогли мне разобраться с маркетинговой стратегией моего бизнеса. Результаты превзошли ожидания — теперь клиенты находят меня сами!'
    },
    {
      image: 'review5.jpg',
      name: 'Дмитрий',
      text: 'Очень доволен сотрудничеством с АйтиШторм. Каждый совет и рекомендация оказались полезными, а команда всегда готова помочь.'
    },
    {
      image: 'review6.jpeg',
      name: 'Ольга',
      text: 'Ребята из АйтиШторм сделали работу на высшем уровне! Я получила больше знаний о продвижении в соцсетях, чем ожидала, и теперь чувствую уверенность в своих действиях.'
    }
  ]

  constructor() {
  }

  getMainSlider(): SliderType[] {
    return this.mainSlider;
  }

  getReviewsSlider(): ReviewType[] {
    return this.reviewsSlider;
  }

}
