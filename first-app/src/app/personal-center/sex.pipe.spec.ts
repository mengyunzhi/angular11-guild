import { SexPipe } from './sex.pipe';

describe('SexPipe', () => {
  it('create an instance', () => {
    const pipe = new SexPipe();
    expect(pipe).toBeTruthy();
    // 预测输入true时，输出男
    expect(pipe.transform(true)).toBe('男');
    // 预测输入true时，输出男
    expect(pipe.transform(false)).toBe('女');
    // 预测输入undefined时，输出-
    expect(pipe.transform(undefined as unknown as boolean)).toBe('-');
    // 预测输入null时，输出-
    expect(pipe.transform(null as unknown as boolean)).toBe('-');
  });
});
