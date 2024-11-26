import { Component, OnInit } from '@angular/core';
import { MatCardHeader, MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../../student.service';

@Component({
  selector: 'app-learningmaterials',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatCardHeader],
  templateUrl: './learningmaterials.component.html',
  styleUrl: './learningmaterials.component.css'
})
export class LearningmaterialsComponent implements OnInit {

  cid: any;
  subid: any
  modules: any;
  admin_name: any;
  subname: any;
  modulecount: any;
  lrn: any;
  progress: any;
  pendingassessments: any;
  announcements: any;


  constructor (private studentservice: StudentService) {}

  ngOnInit(): void {
      this.subid = localStorage.getItem('subjectid');
      this.cid = localStorage.getItem('cid');
      this.admin_name = localStorage.getItem('adminname');
      this.lrn = localStorage.getItem('LRN');
      this.subname = localStorage.getItem('sub_name');
      console.log(this.cid);
      console.log(this.subid);
      this.getModules(this.cid);
      this.pendingassessments(this.lrn);
      this.modulecount = 1;
  }

  getModules(classid:any) {
    this.studentservice.getModules(classid).subscribe((result: any) => {
      this.modules = result;
    })
  }


  getLessons(mid: any, title: any) {
    localStorage.setItem('moduleID', mid);
    localStorage.setItem('moduletitle', title);
  }

  checkProgress() {
    this.studentservice.checkProgress(this.cid, this.lrn).subscribe((result: any) => {
      this.progress = result;
      console.log(result);
    })
  }

  getPendingAssessments(lrn: any) {
    this.studentservice.getPendingAssessments(lrn).subscribe((result: any) => {
      this.pendingassessments = result;
      console.log(result);
    })
  }

  getAssessmentID(aid: any, title: any){
    localStorage.setItem('assessmentID', aid);
    localStorage.setItem('assessmenttitle', title);
  }

  getAnnouncements(cid: any) {
    this.studentservice.getAnnouncements(cid).subscribe((result: any) => {
      this.announcements = result;
      console.log(cid);
      console.log(result);
    })
  }
}
