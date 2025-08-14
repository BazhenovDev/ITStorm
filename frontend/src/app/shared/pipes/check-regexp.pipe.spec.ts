import { RussianLetterPipe } from './check-regexp.pipe';

describe('RussianLetterPipe', () => {
  it('create an instance', () => {
    const pipe = new RussianLetterPipe();
    expect(pipe).toBeTruthy();
  });
});
