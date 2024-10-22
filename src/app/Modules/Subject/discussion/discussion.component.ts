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

  constructor(private studentservice: StudentService, private fb: FormBuilder) {
    this.discussionForm = this.fb.group({
      answer: ['']
    })
  }

  ngOnInit(): void {
      this.discussionTopic = localStorage.getItem('Discussion Topic');
      this.discussionID = localStorage.getItem('discussionid');
      
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

      //Group by student-teacher pairs
      let currentTeacherReply: { user: string; date: any; answer: any; role: any; } | null = null;

      result.forEach((reply: any) => {
        if (reply.adminID) { //Teacher Reply
          if(currentTeacherReply) {
            groupedDiscussions.push(currentTeacherReply); //Push previous teacher reply
            currentTeacherReply = null;
          }
          currentTeacherReply = {
            user: `${reply.teacher_firstname} ${reply.teacher_lastname}`, //Teacher's Full Name
            date: reply.created_at,
            answer: reply.reply,
            role: 'teacher'
          };
        } else {
          if(currentTeacherReply) {
            groupedDiscussions.push(currentTeacherReply); //Push student reply  
            currentTeacherReply = null; //Reset student reply
          }
          groupedDiscussions.push({
            user: `${reply.student_firstname} ${reply.student_lastname}`, //Teacher's Full Name
            date: reply.created_at,
            answer: reply.reply,
            role: 'student'
          });
        }
      });
      //IF THERE IS A STUDENT TEACHER REPLY WITHOUT A TEACHER REPLY, ADD IT
      
      if(currentTeacherReply) {
        groupedDiscussions.push(currentTeacherReply);
      }

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

