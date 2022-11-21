import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutGridSmallComponent } from './bout-grid-small.component';

describe('BoutGridSmallComponent', () => {
  let component: BoutGridSmallComponent;
  let fixture: ComponentFixture<BoutGridSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoutGridSmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoutGridSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
