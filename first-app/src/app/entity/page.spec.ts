import {Page} from './page';

describe('Page', () => {
  it('should create an instance', () => {
    // 不加入last, first初始化
    let page = new Page({
      number: 2,
      size: 20,
      numberOfElements: 200,
      content: []
    });
    expect(page).toBeTruthy();
    expect(page.first).toBeFalse();
    expect(page.last).toBeFalse();
    expect(page.totalPages).toBe(10);

    // 第1页，首页
    page = new Page({
      number: 0,
      size: 20,
      numberOfElements: 192,
      content: []
    });
    expect(page.first).toBeTrue();
    expect(page.last).toBeFalse();
    expect(page.totalPages).toBe(10);

    // 共41条数据，当前第3页，每页20条，所以当前页为尾页
    page = new Page({
      number: 2,
      size: 20,
      numberOfElements: 41,
      content: []
    });
    expect(page.first).toBeFalse();
    expect(page.last).toBeTrue();
    expect(page.totalPages).toBe(3);
  });
});
