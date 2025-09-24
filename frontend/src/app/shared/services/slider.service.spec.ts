import {SliderService} from "./slider.service";
import {SliderType} from "../../../types/slider.type";
import {ReviewType} from "../../../types/review.type";

describe('slider service', () => {

  let sliderService: SliderService;
  beforeEach(() => {
    sliderService = new SliderService();
  });

  it ('should return an array of main slider', () => {
    const result: SliderType[] = sliderService.getMainSlider();
    expect(Array.isArray(result)).toBe(true);
  });

  it ('should return main slider with all required fields', () => {
    const result: SliderType[] = sliderService.getMainSlider();
    const objectKeys = ['image', 'pretitle', 'title', 'type'];
    expect(result.every(item => objectKeys.every(key => key in item))).toBe(true);
  });

  it ('should return main slider is not empty', () => {
    const result: SliderType[] = sliderService.getMainSlider();
    expect(result.length).toBeGreaterThan(0);
  });

  it ('should return an array of reviews slider', () => {
    const result: ReviewType[] = sliderService.getReviewsSlider();
    expect(Array.isArray(result)).toBe(true);
  });

  it ('should return reviews slider with all required fields', () => {
    const result: ReviewType[] = sliderService.getReviewsSlider();
    const objectKeys = ['image', 'name', 'text'];
    expect(result.every(item => objectKeys.every(key => key in item))).toBe(true);
  });

  it ('should return reviews slider is not empty', () => {
    const result: ReviewType[] = sliderService.getReviewsSlider();
    expect(result.length).toBeGreaterThan(0);
  });
})
