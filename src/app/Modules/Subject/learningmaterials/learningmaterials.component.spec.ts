import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningmaterialsComponent } from './learningmaterials.component';

describe('LearningmaterialsComponent', () => {
  let component: LearningmaterialsComponent;
  let fixture: ComponentFixture<LearningmaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningmaterialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearningmaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
