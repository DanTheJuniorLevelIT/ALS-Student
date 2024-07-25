import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingassessmentComponent } from './pendingassessment.component';

describe('PendingassessmentComponent', () => {
  let component: PendingassessmentComponent;
  let fixture: ComponentFixture<PendingassessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingassessmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendingassessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
