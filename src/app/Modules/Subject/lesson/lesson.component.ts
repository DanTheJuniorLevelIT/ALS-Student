import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../../student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [RouterModule, CommonModule],
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

  constructor(private studentservice: StudentService) {}

  ngOnInit(): void {
    this.moduleID = localStorage.getItem('moduleID');
    this.moduletitle = localStorage.getItem('mtitle');
    console.log(this.moduleID);
    this.modulename = localStorage.getItem('moduletitle');
    this.admin_name = localStorage.getItem('admin_name');
    this.subname = localStorage.getItem('subname');
    this.getLessons(this.moduleID);

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

  // // getModules(moduleID:any ) {
  // //   this.studentservice.getModules(moduleID).subscribe((result: any) => {
  // //   this.modulename = result;
  // //   })
  // // }

}
