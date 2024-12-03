import { Component, OnInit } from '@angular/core';
import { MatCardHeader, MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../../student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-discussionlist',
  standalone: true,
  imports: [MatCardHeader, MatCardModule, RouterModule, CommonModule],
  templateUrl: './discussionlist.component.html',
  styleUrl: './discussionlist.component.css'
})
export class DiscussionlistComponent implements OnInit {

  subname: any
  admin_name: any
  discussions: any;
  lessonID: any;
  isLoading: any;

  constructor(private studentservice: StudentService) {}

  ngOnInit(): void {
    this.subname = localStorage.getItem('sub_name');
    this.admin_name = localStorage.getItem('adminname');
    this.lessonID = localStorage.getItem('lessonid');
    this.spinner(this.lessonID);
  }

  getDiscussions(lid: any) {
    this.studentservice.getDiscussions(lid).subscribe((result: any) => {
      this.discussions = result;
      console.log(result);
    })
  }

  getDiscussionID(did: any, dtopic: any) {
    localStorage.setItem('discussionID', did);
    localStorage.setItem('Discussion Topic', dtopic);
  }

  spinner(lid: any) {
    this.isLoading = true;
    this.getDiscussions(lid);
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }
}
