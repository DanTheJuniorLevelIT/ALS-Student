import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectmainComponent } from './subjectmain.component';

describe('SubjectmainComponent', () => {
  let component: SubjectmainComponent;
  let fixture: ComponentFixture<SubjectmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectmainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
