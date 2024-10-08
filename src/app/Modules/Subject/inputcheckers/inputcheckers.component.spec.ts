import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputcheckersComponent } from './inputcheckers.component';

describe('InputcheckersComponent', () => {
  let component: InputcheckersComponent;
  let fixture: ComponentFixture<InputcheckersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputcheckersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputcheckersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
