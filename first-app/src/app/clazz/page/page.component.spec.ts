import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PageComponent} from './page.component';
import {Page} from '../../entity/page';
import {By} from '@angular/platform-browser';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.page = new Page<any>({
      content: [],
      number: 1,
      size: 20,
      numberOfElements: 30
    });
    fixture.autoDetectChanges();
  });

  it('0页', () => {
    component.page = new Page<any>({
      content: [],
      number: 0,
      size: 20,
      numberOfElements: 0
    });
    fixture.detectChanges();
    const navHtml = fixture.debugElement.query(By.css('nav')).nativeElement as HTMLElement;
    expect(navHtml.style.visibility).toEqual('hidden');
  });

  it('1页', () => {
    component.page = new Page<any>({
      content: [],
      number: 0,
      size: 20,
      numberOfElements: 10
    });
    fixture.detectChanges();
    const navHtml = fixture.debugElement.query(By.css('nav')).nativeElement as HTMLElement;
    expect(navHtml.style.visibility).toEqual('hidden');
  });

  it('2页', () => {
    component.page = new Page<any>({
      content: [],
      number: 0,
      size: 20,
      numberOfElements: 25
    });
    fixture.detectChanges();
    const navHtml = fixture.debugElement.query(By.css('nav')).nativeElement as HTMLElement;
    expect(navHtml.style.visibility).toEqual('visible');
  });

  it('将总页码的最大数量控制在7页', () => {
    component.page = {
      number: 2,
      size: 20,
      totalPages: 20
    } as Page<any>;
    fixture.autoDetectChanges();
  });

  it('总页码小于7', () => {
    // 共5页，当前第4页
    component.page = {
      number: 3,
      size: 20,
      totalPages: 5
    } as Page<any>;
    fixture.detectChanges();
    expect(component.pages.length).toBe(5);

    // 共3页，当前第2页
    component.page = {
      number: 1,
      size: 20,
      totalPages: 3
    } as Page<any>;
    fixture.detectChanges();
    expect(component.pages.length).toBe(3);
  });

  it('总页码等于7', () => {
    // 共7页，当前第5页
    component.page = {
      number: 4,
      size: 20,
      totalPages: 7
    } as Page<any>;
    fixture.detectChanges();
    expect(component.pages.length).toBe(7);

    // 共7页，当前第7页
    component.page = {
      number: 6,
      size: 20,
      totalPages: 7
    } as Page<any>;
    fixture.detectChanges();
    expect(component.pages.length).toBe(7);
  });

  it('总页数大于7, 第1页，共8页', () => {
    // 共1页，当前第8页
    component.page = {
      number: 0,
      size: 20,
      totalPages: 8
    } as Page<any>;
    fixture.detectChanges();
    // 共显示7页
    expect(component.pages.length).toBe(7);
    // 头是第1页
    expect(component.pages[0]).toBe(0);
    // 尾是第7页
    expect(component.pages.pop()).toBe(6);
  });

  it('1 2 [3] 4 5 6 7', () => {
    // 共3页，当前第8页
    component.page = {
      number: 2,
      size: 20,
      totalPages: 8
    } as Page<any>;
    fixture.detectChanges();
    // 共显示7页
    expect(component.pages.length).toBe(7);
    // 头是第1页
    expect(component.pages[0]).toBe(0);
    // 尾是第7页
    expect(component.pages.pop()).toBe(6);
  });

  it('1 2 3 [4] 5 6 7', () => {
    // 共4页，当前第8页
    component.page = {
      number: 3,
      size: 20,
      totalPages: 8
    } as Page<any>;
    fixture.detectChanges();
    // 共显示7页
    expect(component.pages.length).toBe(7);
    // 头是第1页
    expect(component.pages[0]).toBe(0);
    // 尾是第7页
    expect(component.pages.pop()).toBe(6);
  });

  it('7 8 9 [10] 11 12 13', () => {
    component.page = {
      number: 9,
      size: 20,
      totalPages: 18
    } as Page<any>;
    fixture.detectChanges();
    // 共显示7页
    expect(component.pages.length).toBe(7);
    expect(component.pages[0]).toBe(6);
    expect(component.pages.pop()).toBe(12);
  });

  it('12 13 14 [15] 16 17 18', () => {
    component.page = {
      number: 14,
      size: 20,
      totalPages: 18
    } as Page<any>;
    fixture.detectChanges();
    // 共显示7页
    expect(component.pages.length).toBe(7);
    expect(component.pages[0]).toBe(11);
    expect(component.pages.pop()).toBe(17);
  });

  it('12 13 14 15 [16] 17 18', () => {
    component.page = {
      number: 15,
      size: 20,
      totalPages: 18
    } as Page<any>;
    fixture.detectChanges();
    // 共显示7页
    expect(component.pages.length).toBe(7);
    expect(component.pages[0]).toBe(11);
    expect(component.pages.pop()).toBe(17);
  });

  it('12 13 14 15 16 17 [18]', () => {
    component.page = {
      number: 17,
      size: 20,
      totalPages: 18
    } as Page<any>;
    fixture.detectChanges();
    // 共显示7页
    expect(component.pages.length).toBe(7);
    expect(component.pages[0]).toBe(11);
    expect(component.pages.pop()).toBe(17);
  });
});
