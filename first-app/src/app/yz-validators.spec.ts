import { YzValidators } from './yz-validators';
import {FormControl} from '@angular/forms';

describe('YzValidators', () => {
  it('should create an instance', () => {
    expect(new YzValidators()).toBeTruthy();
    // 空手机号，返回非null
    const formControl = new FormControl('');
    expect(YzValidators.phone(formControl)).toBeTruthy();

    // 正常的手机号，返回null
    formControl.setValue('13900000000');
    expect(YzValidators.phone(formControl)).toBeNull();

    // 以2打头，返回非null
    formControl.setValue('23900000000');
    expect(YzValidators.phone(formControl)).toBeTruthy();

    // 不足11位，返回非null
    formControl.setValue('1390000000');
    expect(YzValidators.phone(formControl)).toBeTruthy();
  });

  it('将验证器加入到FromControl', () => {
    // 空手机号，校验失败
    const formControl = new FormControl('', YzValidators.phone);
    expect(formControl.invalid).toBeTrue();
    expect(formControl.valid).toBeFalse();

    // 正常的手机号，校验成功
    formControl.setValue('13900000000');
    expect(formControl.invalid).toBeFalse();
    expect(formControl.valid).toBeTrue();

    // 以2打头，校验失败
    formControl.setValue('23900000000');
    expect(formControl.invalid).toBeTrue();
    expect(formControl.valid).toBeFalse();

    // 不足11位，校验失败
    formControl.setValue('1390000000');
    expect(formControl.invalid).toBeTrue();
    expect(formControl.valid).toBeFalse();
  });
});
