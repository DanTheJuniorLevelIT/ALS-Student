import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayclassesComponent } from './todayclasses.component';

describe('TodayclassesComponent', () => {
  let component: TodayclassesComponent;
  let fixture: ComponentFixture<TodayclassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayclassesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodayclassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
