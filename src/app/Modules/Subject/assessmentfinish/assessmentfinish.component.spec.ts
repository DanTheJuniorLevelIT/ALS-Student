import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentfinishComponent } from './assessmentfinish.component';

describe('AssessmentfinishComponent', () => {
  let component: AssessmentfinishComponent;
  let fixture: ComponentFixture<AssessmentfinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentfinishComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentfinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
