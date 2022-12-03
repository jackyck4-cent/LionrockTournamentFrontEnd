import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TnDetailComponent } from './tn-detail.component';

describe('TnDetailComponent', () => {
  let component: TnDetailComponent;
  let fixture: ComponentFixture<TnDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TnDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TnDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
