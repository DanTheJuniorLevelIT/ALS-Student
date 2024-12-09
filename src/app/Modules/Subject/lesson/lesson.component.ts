import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../../../student.service';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [RouterModule, CommonModule, MatExpansionModule],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent implements OnInit {

  lessons: any
  lessonID: any
  moduleID: any
  modulename: any
  moduletitle: any
  admin_name: any
  subname: any
  lrn: any
  assessmentlist: { [lessonId: string]: any [] } = {};
  overdueHeaderShown: boolean = false;
  isLoading = false;

  constructor(private studentservice: StudentService, private route: Router) {}

  ngOnInit(): void {
    this.moduleID = localStorage.getItem('moduleID');
    this.moduletitle = localStorage.getItem('mtitle');
    console.log(this.moduleID);
    this.modulename = localStorage.getItem('moduletitle');
    this.admin_name = localStorage.getItem('adminname');
    this.subname = localStorage.getItem('sub_name');
    this.spinner(this.moduleID);
    this.lrn = localStorage.getItem('LRN');
    // // this.getModules(this.moduleID);
  }

  getLessons(moduleID: any) {
    this.studentservice.getLessons(moduleID).subscribe((result:any)=> {
    this.lessons = result;
    console.log(this.lessons);
    })
  }
  getLessonID(lid:any) {
    localStorage.setItem('lessonid',lid);
  }

  getAssessments(lid: any){
    this.studentservice.getAssessments(lid, this.lrn).subscribe((result:any)=>{
      const today = new Date();
      this.assessmentlist[lid] = result;

        // this.assessmentlist.forEach((assessment:any) => {
        //   const dueDate = new Date(assessment.due_date);
        //   assessment.isOpen = dueDate >= today ? true : false; 
        // });
      
      console.log(result);
    })
  }

  getAssessmentID(aid: any, title: any){
    localStorage.setItem('assessmentID', aid);
    localStorage.setItem('assessmenttitle', title);
  }

  proceedToResultAnalysis(aid: any) {
    localStorage.setItem('pickedAssessmentID', aid);
    // const path = ['subjectmain', 'modules', 'lesson', 'result-analysis', aid];
    // console.log('Navigating to:', path);
    // this.route.navigate(path).catch(err => console.error('Navigation error:', err));  
  }

  // // getModules(moduleID:any ) {
  // //   this.studentservice.getModules(moduleID).subscribe((result: any) => {
  // //   this.modulename = result;
  // //   })
  // // }

  spinner(moduleID: any) {
    this.isLoading = true;
    this.getLessons(moduleID);
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

}
