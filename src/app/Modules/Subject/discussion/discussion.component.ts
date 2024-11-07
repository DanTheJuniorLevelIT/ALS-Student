import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../../student.service';
import { group } from 'console';

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.css'
})
export class DiscussionComponent implements OnInit {

  discussionID: any;
  discussionTopic: any;
  discussions: any[] = [];
  discussionForm: FormGroup;
  loggedInLRN: any;

  constructor(private studentservice: StudentService, private fb: FormBuilder) {
    this.discussionForm = this.fb.group({
      answer: ['']
    })
  }

  ngOnInit(): void {
      this.discussionTopic = localStorage.getItem('Discussion Topic');
      this.discussionID = localStorage.getItem('discussionID');
      console.warn(this.discussionID);
      this.loadDiscussions(this.discussionID);

      // Get the current logged-in user's LRN from localStorage
      this.loggedInLRN = localStorage.getItem('LRN');
  }

  transformText(text: string): string {
    //Split text into paragraphs by double newlines or line breaks
    let paragraphs = text.split(/\n\s*\n/);

    // For each paragraph, add <p> tags, and within each paragraphs add <br> after each period
    return paragraphs
    .map(paragraph => paragraph.replace(/\.\s*/g, '.<br>')) //Add <br> after each period
    .map(paragraph => `<p>${paragraph}</p>` ) //Wrap each transformed paragraph in <p> tags
    .join(''); ///Join all paragraphs together 
  }

  loadDiscussions(discussionid: any) {
    this.studentservice.viewDiscussionReplies(discussionid).subscribe((result: any) => {
      const groupedDiscussions: any[] = [];
  
      result.forEach((reply: any) => {
        let role = 'student';
        let user = `${reply.student_firstname} ${reply.student_lastname}`;
  
        // Check if it's a teacher's reply
        if (reply.adminID) {
          role = 'teacher';
          user = `${reply.teacher_firstname} ${reply.teacher_lastname}`;
        }
  
        // Determine if the reply is from the current user (logged-in student)
        const isCurrentUser = String(reply.lrn) === String(this.loggedInLRN);
        console.log('Checking reply LRN:', reply.lrn, 'against logged-in LRN:', this.loggedInLRN, '-> isCurrentUser:', isCurrentUser);
  
        groupedDiscussions.push({
          user,
          date: reply.created_at,
          answer: reply.reply,
          role,
          isCurrentUser
        });
      });
  
      this.discussions = groupedDiscussions;
    });
  }
  

  //Submit a new discussion reply
  submitAnswer() {
    const newAnswer = this.discussionForm.value.answer;
    const storedStudentLRN = localStorage.getItem('LRN')

    //Prepare the payload based on the user role (student or teacher)
    const payload = {
      discussionid: this.discussionID,
      lrn: storedStudentLRN, // Set learner's LRN if applicable
      adminID: null, // if the user is a learner, set this to null
      reply: newAnswer
    };

    this.studentservice.sendDiscussionReplies(payload).subscribe((result: any) => {
      this.loadDiscussions(this.discussionID); //Reload replies after sending a new one
      this.discussionForm.reset();
    })
  }


}

