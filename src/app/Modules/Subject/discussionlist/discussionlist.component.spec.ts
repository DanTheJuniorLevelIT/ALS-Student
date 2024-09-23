import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionlistComponent } from './discussionlist.component';

describe('DiscussionlistComponent', () => {
  let component: DiscussionlistComponent;
  let fixture: ComponentFixture<DiscussionlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscussionlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscussionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
