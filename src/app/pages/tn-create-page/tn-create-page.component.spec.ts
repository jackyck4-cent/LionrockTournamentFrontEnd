import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TnCreatePageComponent } from './tn-create-page.component';

describe('TnCreatePageComponent', () => {
  let component: TnCreatePageComponent;
  let fixture: ComponentFixture<TnCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TnCreatePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TnCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
