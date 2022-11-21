import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TnDetailPageComponent } from './tn-detail-page.component';

describe('TnDetailPageComponent', () => {
  let component: TnDetailPageComponent;
  let fixture: ComponentFixture<TnDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TnDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TnDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
