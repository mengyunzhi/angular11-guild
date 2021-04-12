import {AbstractControl, ValidationErrors} from '@angular/forms';

export class YzValidators {
  /**
   * 验证手机号
   */
  static phone(control: AbstractControl): ValidationErrors | null {
    const phone = control.value as string;
    // 如果手机号是11位，并且以1打头，则验证成功
    if (phone.length === 11 && phone.startsWith('1')) {
      return null;
    }
    return {phone: '手机号格式错误'};
  }
}
