import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TnListItemComponent } from './tn-list-item.component';

describe('TnListItemComponent', () => {
  let component: TnListItemComponent;
  let fixture: ComponentFixture<TnListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TnListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TnListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
