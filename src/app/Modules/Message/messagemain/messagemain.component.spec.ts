import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagemainComponent } from './messagemain.component';

describe('MessagemainComponent', () => {
  let component: MessagemainComponent;
  let fixture: ComponentFixture<MessagemainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagemainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessagemainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
