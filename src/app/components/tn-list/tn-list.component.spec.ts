import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TnListComponent } from './tn-list.component';

describe('TnListComponent', () => {
  let component: TnListComponent;
  let fixture: ComponentFixture<TnListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TnListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
