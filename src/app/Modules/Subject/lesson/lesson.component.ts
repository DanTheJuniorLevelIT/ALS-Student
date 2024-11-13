import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  assessmentlist: any;
  overdueHeaderShown: boolean = false;

  constructor(private studentservice: StudentService) {}

  ngOnInit(): void {
    this.moduleID = localStorage.getItem('moduleID');
    this.moduletitle = localStorage.getItem('mtitle');
    console.log(this.moduleID);
    this.modulename = localStorage.getItem('moduletitle');
    this.admin_name = localStorage.getItem('admin_name');
    this.subname = localStorage.getItem('subname');
    this.getLessons(this.moduleID);
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
      this.assessmentlist = result;

      this.assessmentlist.forEach((assessment:any) => {
        const dueDate = new Date(assessment.due_date);
        assessment.isOpen = dueDate >= today ? true : false; //Close if due date has passed
      });
      
      console.log(result);
    })
  }

  getAssessmentID(aid: any, title: any){
    localStorage.setItem('assessmentID', aid);
    localStorage.setItem('assessmenttitle', title);
  }

  // // getModules(moduleID:any ) {
  // //   this.studentservice.getModules(moduleID).subscribe((result: any) => {
  // //   this.modulename = result;
  // //   })
  // // }

}
