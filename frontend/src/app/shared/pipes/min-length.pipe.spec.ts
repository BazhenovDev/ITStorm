import { MinLenghtPipe } from './min-length.pipe';

describe('MinLenghtPipe', () => {
  it('create an instance', () => {
    const pipe = new MinLenghtPipe();
    expect(pipe).toBeTruthy();
  });
});
