import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashSuccessComponent } from './dash-success.component';

describe('DashSuccessComponent', () => {
  let component: DashSuccessComponent;
  let fixture: ComponentFixture<DashSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
