import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TnManagePageComponent } from './tn-manage-page.component';

describe('TnManagePageComponent', () => {
  let component: TnManagePageComponent;
  let fixture: ComponentFixture<TnManagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TnManagePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TnManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
