import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.css'
})
export class DiscussionComponent implements OnInit {
  discussionForm: FormGroup;
  discussions: { user: string, date: Date, answer: string, role: string }[] = [
    { user: 'Teacher', date: new Date(), answer: 'Hello ALS Learners this is our topic for discussion today. Share your thoughts about this topic. Lets begin.', role: 'teacher' },
    { user: 'Student', date: new Date(), answer: 'For me, swallowed blood can irritate your stomach and cause vomiting. And vomiting may make the bleeding worse or cause it to start again. Spit out any blood that gathers in your mouth and throat rather than swallowing it. Use your thumb and forefinger to firmly pinch the soft part of your nose shut.', role: 'student' }
  ];

  constructor(private fb: FormBuilder) {
    this.discussionForm = this.fb.group({
      answer: ['']
    });
  }

  ngOnInit() {}

  submitAnswer() {
    const newAnswer = this.discussionForm.value.answer;
    const newDiscussion = {
      user: 'Teacher',
      date: new Date(),
      answer: newAnswer,
      role: 'teacher' // or 'teacher' based on who is replying
    };
    this.discussions.push(newDiscussion);
    this.discussionForm.reset();
  }
}

