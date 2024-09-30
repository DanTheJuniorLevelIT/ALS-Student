import { Component, OnInit } from '@angular/core';
import { MatCardHeader, MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../../student.service';

@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [RouterModule ,MatCardModule, MatCardHeader],
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.css'
})
export class AssessmentComponent implements OnInit {

  subname: any
  admin_name: any
  lessonid: any;
  assessmentlist: any;
  lrn: any;
  progress: any;

  constructor(private student: StudentService) {}

  ngOnInit(): void {
    this.subname = localStorage.getItem('subname');
    this.admin_name = localStorage.getItem('admin_name');
    this.lessonid = localStorage.getItem('lessonid');
    this.lrn = localStorage.getItem('LRN');
    console.log(this.lessonid);
    this.getAssessments(this.lessonid);
    this.getAssessmentProgress(this.lrn);

  }
  getAssessments(lid: any){
    this.student.getAssessments(lid).subscribe((result:any)=>{
      this.assessmentlist = result;
    })
  }
  getAssessmentID(aid: any, title: any){
    localStorage.setItem('assessmentID', aid);
    localStorage.setItem('assessmenttitle', title);
  }

  getAssessmentProgress(lrn: any) {
    this.student.getAssessmentProgress(lrn).subscribe((result:any) => {
      this.progress = result;
      console.log(result);
    })
  }

//   isAssessmentCompleted(assessmentId: any): boolean {
//     if (this.progress) {
//         return this.progress.some((progressItem: any) => progressItem.assessmentID === assessmentId);
//     }
//     return false;
// }
  

}
