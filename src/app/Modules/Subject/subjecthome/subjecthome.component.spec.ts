import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjecthomeComponent } from './subjecthome.component';

describe('SubjecthomeComponent', () => {
  let component: SubjecthomeComponent;
  let fixture: ComponentFixture<SubjecthomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjecthomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjecthomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
