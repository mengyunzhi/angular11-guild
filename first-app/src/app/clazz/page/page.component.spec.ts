import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PageComponent} from './page.component';
import {Page} from '../../entity/page';

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

});
