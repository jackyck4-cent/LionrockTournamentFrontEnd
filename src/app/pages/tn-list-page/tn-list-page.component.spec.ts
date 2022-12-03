import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TnListPageComponent } from './tn-list-page.component';

describe('TnListPageComponent', () => {
  let component: TnListPageComponent;
  let fixture: ComponentFixture<TnListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TnListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TnListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
